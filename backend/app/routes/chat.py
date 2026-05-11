from fastapi import APIRouter, HTTPException, Depends
from app.middlewares.auth_middleware import get_current_user
# from app.utils.title_generator import generate_title
from app.schemas.message import MessageResponse, MessageCreate
from app.db.database import supabase
import json


router = APIRouter()

@router.post("/message/create", response_model=MessageResponse)
async def create_message(data: MessageCreate, user: dict = Depends(get_current_user)):
	try:
		message = data.message
		chat_id = data.chat_id
		if chat_id is None:
			user_id = user["id"]
			chat_response = (
				supabase.table("chat").insert({
				"user_id": user_id,
				"title": "message"   # generate_title(message)
				}).execute()
			)

			chat = chat_response.data[0]
			chat_id = chat["id"]

		ai_response = [{
			"error": message,
			"fix": "salam alaykoum",
			"score": 0.5
		}]

		# for result in search(message):
		# 	ai_response.append({
		# 		"error": result["data"]["error"],
		# 		"fix": result["data"]["fix"],
		# 		"score": result["score"]
		# 	})

		# Save User Message

		(
			supabase.table("messages").insert({
				"chat_id": chat_id,
				"role": "user",
				"message": message
			}).execute()
		)
		# Save System Message
		(
			supabase.table("messages").insert({
				"chat_id": chat_id,
				"role": "system",
				"message": json.dumps(ai_response)
			}).execute()
		)
		print(ai_response)
		return {
			"chat_id": chat_id,
			"response": ai_response
		}
	except Exception as e:
		print(e)
		raise HTTPException(
			status_code=500,
			detail=str(e)
		)
