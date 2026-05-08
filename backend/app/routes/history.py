from fastapi import APIRouter, HTTPException, Depends
from app.db.database import supabase
from app.middlewares.auth_middleware import get_current_user


router = APIRouter()

@router.get("/chats")
async get_chats(payload: dict = Depends(get_current_user()):
	try:
		user_id = payload["sub"]
		response = supabase.table("chats").select("*").eq("user_id", user_id)
		return {
			message

	return {"message": "ok"}



@router.get("/chat/{id}")
async def get_chat(
	payload: dict = Depends(get_current_user), 
	id: str
	):
	try:
		response = supabase.table("chat").select("*").eq("id", id).limit(1).execute()
		print(response)
		return response
	except HTTPException as e:
		print(e)



	
