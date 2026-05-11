from pydantic import BaseModel
from datetime import datetime

class ChatResponse(BaseModel):
	id: str
	title: str
	created_at: datetime
