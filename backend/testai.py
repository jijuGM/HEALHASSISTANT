<<<<<<< HEAD
from llm.ai_engine import generate_advice

user_state = {
    "sleep": 5,
    "stress": "high",
    "cycle_phase": "luteal",
    "craving": "sweet"
}

question = "I crave chocolate at night. What should I do?"

answer = generate_advice(question, user_state)

print("\nAI Advice:\n")
=======
from llm.ai_engine import generate_advice

user_state = {
    "sleep": 5,
    "stress": "high",
    "cycle_phase": "luteal",
    "craving": "sweet"
}

question = "I crave chocolate at night. What should I do?"

answer = generate_advice(question, user_state)

print("\nAI Advice:\n")
>>>>>>> 1eba14f7b45a70a1cf2bff915dd3d995e4b5d2e3
print(answer)