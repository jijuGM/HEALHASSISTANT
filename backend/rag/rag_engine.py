
import os
from rag.retriever import retrieve_context
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-pro")

def generate_response(question, user_state):

    context = retrieve_context(question)

    prompt = f"""
You are an AI assistant helping women manage PCOD cravings.

User state:
{user_state}

Knowledge:
{context}

Question:
{question}

Provide helpful advice.
"""

    response = model.generate_content(prompt)


import os
from rag.retriever import retrieve_context
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-pro")

def generate_response(question, user_state):

    context = retrieve_context(question)

    prompt = f"""
You are an AI assistant helping women manage PCOD cravings.

User state:
{user_state}

Knowledge:
{context}

Question:
{question}

Provide helpful advice.
"""

    response = model.generate_content(prompt)


    return response.text