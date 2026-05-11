from fastapi import APIRouter, HTTPException, Depends
from app.db.database import supabase
from app.middlewares.auth_middleware import get_current_user
from app.schemas.chat import ChatResponse
from typing import List


router = APIRouter()

@router.get("/chats", response_model=List[ChatResponse])
async def get_chats(user: dict = Depends(get_current_user)):
	try:
		user_id = user["id"]
		print("USER_ID: ", user_id)
		response = supabase.table("chat").select("*").eq("user_id", user_id).execute()
		print("RESPONSE from HISTORY: ", response)
		if response:
			return response.data
			
	except Exception as e:
		print(e)
		raise HTTPException(status_code=500, detail=str(e))




@router.get("/chat/{chat_id}", response_model=ChatResponse)
async def get_chat(
	chat_id: str,
	payload: dict = Depends(get_current_user)
	
	):
	try:
		response = supabase.table("chat").select("*").eq("id", id).limit(1).execute()
		print(response)
		return response
	except HTTPException as e:
		print(e)



	
