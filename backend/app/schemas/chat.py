from pydantic import BaseModel
from datetime import datetime

class ChatResponse(BaseModel):
	id: str
	user_id: str
	created_at: datetime
