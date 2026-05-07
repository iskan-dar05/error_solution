from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import check_connection
from app.routes.chat import router as chat_route
from app.routes.history import router as history_route


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health/db")
def db_health():
    result = check_connection()
    if result["success"]:
        return {
            "message": "✅ Database connected",
            "status": result["status"]
        }

    return {
        "message": "❌ Database not connected",
        "status": result["status"],
        "error": result["error"]
    }

app.include_router(chat_route)
app.include_router(history_route)
