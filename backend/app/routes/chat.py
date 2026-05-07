from fastapi import APIRouter,HTTPException


router = APIRouter()

@router.get("chat/{id}")
async def get_chat():
	try:
		response = await supabase.table("chat").select("*").eq("id", id).maybe_single().execute()
		print(response)
	except HTTPException as e:
		print(e)
