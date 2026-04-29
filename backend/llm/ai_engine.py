import os
from dotenv import load_dotenv
from groq import Groq

from rag.retriever import retrieve_context

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_advice(question, user_state, history=None):
    # 🔍 Get RAG context
    context = retrieve_context(question)

    # 🧠 Build conversation memory summary from history
    memory_summary = ""
    known_facts = []

    if history:
        for msg in history:
            role = msg.get("role", "")
            text = msg.get("content") or msg.get("text") or msg.get("message") or ""
            if role == "user" and text:
                known_facts.append(f"User said: {text}")
            elif role == "assistant" and text:
                known_facts.append(f"Assistant said: {text}")

    if known_facts:
        memory_summary = "Conversation history (already known — do NOT re-ask these):\n" + "\n".join(known_facts[-10:])

    # 🧠 Improved system prompt (balanced tone)
    system_prompt = """
You are an intelligent and supportive PCOD health assistant.

GOAL:
Understand the user's situation and provide helpful, practical guidance related to lifestyle, cravings, and hormonal balance.

BEHAVIOR:
- Do not behave like a chatbot that keeps asking questions
- Ask at most ONE simple question only if truly needed
- If enough context is available → give advice directly
- NEVER ask about something the user has already mentioned in history

MEMORY RULES:
- Read the conversation history carefully before responding
- Do not re-ask about sleep, stress, water, cravings, or cycle phase if already mentioned
- Track what the user has already confirmed or answered
- Build on previous context instead of starting fresh each time

TONE:
- Friendly, calm, and human
- Not too casual, not too clinical
- 2–4 lines maximum
- No bullet points, no labels

KNOWLEDGE USAGE:
- Use relevant PCOD knowledge (hormones, insulin, cravings, sleep, stress)
- Blend knowledge naturally into the response
- Do not dump or repeat raw context

SAFETY:
- No medications
- No extreme diet advice

OUTPUT:
Always provide a meaningful response (advice or guidance). Never repeat a question already asked in history.
"""

    messages = [{"role": "system", "content": system_prompt}]

    # ✅ Add conversation history with correct key fallback
    if history:
        for msg in history[-8:]:
            role = msg.get("role", "user")
            text = msg.get("content") or msg.get("text") or msg.get("message") or ""
            if text.strip():
                messages.append({
                    "role": "user" if role == "user" else "assistant",
                    "content": text
                })

    # 🧠 Build context-aware user input
    user_context = f"""
{memory_summary}

Current user state:
- Sleep: {user_state.get("sleep", "unknown")}
- Stress: {user_state.get("stress", "unknown")}
- Cycle phase: {user_state.get("cycle_phase", "unknown")}
- Craving: {user_state.get("craving", "unknown")}

Relevant PCOD insights (use only if helpful):
{context}

User's current message:
{question}

Instructions:
- Use the conversation history to avoid repeating yourself or re-asking answered questions
- Give direct, helpful advice based on everything you know about this user so far
- Ask one follow-up question only if something truly critical is still unknown
"""

    messages.append({
        "role": "user",
        "content": user_context
    })

    # 🚀 Call LLM
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages
        )
        answer = response.choices[0].message.content
    except Exception as e:
        print(f"LLM call failed: {e}")
        answer = None

    # 🔥 Strong fallback (demo safe)
    if not answer or len(answer.strip()) < 5:
        return "Based on what you've shared, maintaining balanced meals and stable sleep can really help with cravings. Would you like suggestions tailored to your routine?"

    return answer.strip()