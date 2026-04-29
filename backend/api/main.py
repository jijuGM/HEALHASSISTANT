
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List, Dict

from llm.ai_engine import generate_advice

app = FastAPI()

# ✅ Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Request Model
class UserQuery(BaseModel):
    question: str
    sleep: Optional[int] = None
    stress: Optional[str] = None
    cycle_phase: Optional[str] = None
    craving: Optional[str] = None
    history: Optional[List[Dict]] = None   # 🔥 important


@app.post("/ask")
def ask_ai(data: UserQuery):

    # ✅ Build dynamic user state
    user_state = {}

    if data.sleep is not None:
        user_state["sleep"] = data.sleep

    if data.stress is not None:
        user_state["stress"] = data.stress

    if data.cycle_phase is not None:
        user_state["cycle_phase"] = data.cycle_phase

    if data.craving is not None:
        user_state["craving"] = data.craving

    # ✅ Clean history (avoid None)
    history = data.history if data.history else []

    # 🔥 Pass history to AI engine
    answer = generate_advice(
        question=data.question,
        user_state=user_state,
        history=history
    )


from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List, Dict

from llm.ai_engine import generate_advice

app = FastAPI()

# ✅ Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Request Model
class UserQuery(BaseModel):
    question: str
    sleep: Optional[int] = None
    stress: Optional[str] = None
    cycle_phase: Optional[str] = None
    craving: Optional[str] = None
    history: Optional[List[Dict]] = None   # 🔥 important


@app.post("/ask")
def ask_ai(data: UserQuery):

    # ✅ Build dynamic user state
    user_state = {}

    if data.sleep is not None:
        user_state["sleep"] = data.sleep

    if data.stress is not None:
        user_state["stress"] = data.stress

    if data.cycle_phase is not None:
        user_state["cycle_phase"] = data.cycle_phase

    if data.craving is not None:
        user_state["craving"] = data.craving

    # ✅ Clean history (avoid None)
    history = data.history if data.history else []

    # 🔥 Pass history to AI engine
    answer = generate_advice(
        question=data.question,
        user_state=user_state,
        history=history
    )


    return {"advice": answer}