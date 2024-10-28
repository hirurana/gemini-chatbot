from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from uuid import uuid4

class NewMessage(BaseModel):
    messageId: str
    messageContent: str

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/query_model")
async def query_model(message: NewMessage):
    # TODO: send message to gemini
    return {"messageId": uuid4(), "messageContent": f"{message.messageId} says {message.messageContent}"}
