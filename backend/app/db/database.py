# db/supabase.py
from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

print(SUPABASE_URL)
print(SUPABASE_KEY)


supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


def check_connection():
	try:
		supabase.table("users").select("id").limit(1).execute()
		return {
            "status": "connected",
            "success": True
        }
	except Exception as e:
		return {
            "status": "not_connected",
            "success": False,
            "error": str(e)
        }