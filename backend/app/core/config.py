from pydantic_settings import BaseSettings

class Settings(BaseSettings):
	SUPABASE_URL: str
	SUPABASE_KEY: str
	CLERK_SECRET_KEY: str
	CLERK_ISSUER: str
	CLERK_JWKS_URL: str

	class Config:
		env_file = ".env"

settings = Settings()