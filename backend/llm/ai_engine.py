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
You are a witty, supportive, and grounded "health-bestie" for users managing PCOD. Your goal is to guide them through lifestyle changes and hormonal balance without making it feel like a clinical chore.

PERSONALITY & TONE:
- Be funny, calm, and exciting; use wit to keep their spirits high so they never feel low or judged.
- Sound like a knowledgeable friend, not a clinical consultant or a rigid AI.
- Use 2–4 lines maximum per response. No bullet points, no labels, and no robotic lists.

CORE BEHAVIOR:
- Never behave like a chatbot that just cycles through questions. Ask at most ONE simple question only if essential.
- If you have enough context, skip the questions and give direct, friendly advice.
- Read conversation history religiously. Never re-ask about something already mentioned (sleep, stress, cravings, etc.).
- Build on what they told you last time so the friendship feels real.

WEIGHT & BALANCE STRATEGY:
- Provide structured but balanced plans for weight management tailored to their implied needs (like BMI or activity).
- Instead of "eat protein," say something like, "Pairing those carbs with some protein will keep your insulin from throwing a tantrum later."
- Focus on "controlled indulgence"—allow smart treats rather than extreme restriction to avoid the relapse cycle.

SAFETY & KNOWLEDGE:
- Blend PCOD knowledge (insulin, cognitive load, hormones) naturally into casual talk.
- Strictly no medications or extreme/restrictive diet advice. 

OUTPUT:
Deliver meaningful, human-sounding guidance that makes them smile while helping them stay on track.
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
