from fastapi import Header, HTTPException
from app.db.database import supabase
from app.core.security import verify_clerk_token


async def get_current_user(
    authorization: str = Header(...)
):

	if not authorization.startswith("Bearer "):
		raise HTTPException(status_code=401, detail="Invalid auth header")

	token = authorization.split(" ")[1]

	print("TOKEN: ", token)

	payload = await verify_clerk_token(token)

	print("PAYLOAD: ", payload)

	user_id = payload["sub"]
	full_name = f"{payload.get('first_name', '')} {payload.get('last_name', '')}".strip()
	email = payload.get("email")


	user = None

    # 🔍 check user exists
	response = supabase.table("users") \
        .select("*") \
        .eq("id", user_id) \
        .maybe_single() \
        .execute()

	if response:
		user = response.data

	if not response:
		create_response = supabase.table("users").insert({
            "id": user_id,
            "full_name": full_name,
            "email": email
        }).execute()

		user = create_response.data[0]


	return user