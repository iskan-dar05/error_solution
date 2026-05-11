from pydantic import BaseModel
from typing import List


class AIResponse(BaseModel):
	error: str
	fix: str
	score: float

class MessageResponse(BaseModel):
	chat_id: str
	response: List[AIResponse]

class MessageCreate(BaseModel):
	message: str
	chat_id: str | None = None

