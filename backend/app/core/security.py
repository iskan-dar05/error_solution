import httpx
from jose import jwt
from fastapi import HTTPException, status
import os
from dotenv import load_dotenv


load_dotenv()


CLERK_SECRET_KEY = os.getenv("CLERK_SECRET_KEY")
CLERK_ISSUER = os.getenv("CLERK_ISSUER")
CLERK_JWKS_URL = os.getenv("CLERK_JWKS_URL")

print("CLERK_SECRET_KEY", CLERK_SECRET_KEY)
print("CLERK_ISSUER", CLERK_ISSUER)
print("CLERK_JWKS_URL", CLERK_JWKS_URL)

jwks_cache = None


async def get_jwks():
	global jwks_cache

	if jwks_cache:
		return jwks_cache


	async with httpx.AsyncClient() as client:
		resp = await client.get(CLERK_JWKS_URL)
		resp.raise_for_status()
		jwks_cache = resp.json()
		return jwks_cache



async def verify_clerk_token(token: str):
    jwks = await get_jwks()

    print("GET JWKS SUCESS", jwks)

    try:
        payload = jwt.decode(
            token,
            jwks,
            algorithms=["RS256"],
            audience=None,
            issuer=CLERK_ISSUER
        )
        print("PAYLOAD FROM security.py", payload)
        return payload
    except Exception as e:
        print("EXCEPTIOIN FROM SECURITY: ", e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Clerk token"
        )