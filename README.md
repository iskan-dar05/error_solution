## Error Solution AI 🚀


AI-powered mobile application for developers that analyzes programming errors and returns similar fixes using semantic search and a simple RAG (Retrieval-Augmented Generation) system.

The project consists of a React Native Android app built with Expo and a FastAPI backend that uses Sentence Transformers and FAISS for intelligent error similarity matching.



## ✨ Features
- 📱 React Native Android application
- ⚡ FastAPI backend API
- 🔐 Authentication with Clerk
- ☁️ Supabase database integration
- 🧠 Semantic error embeddings using Sentence Transformers
- 🔍 Similarity search using FAISS
- 📚 Persistent error vector storage
- 💬 Chat-based developer experience
- 🧾 Chat history saving
- ⚡ Fast semantic retrieval pipeline

## 🏗️ Project Structure
```
error_solution/
│
├── ErrorSolution/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (drawer)/
│   │   └── _layout.tsx
│   │
│   ├── utils/
│   ├── global.css
│   ├── tailwind.config.js
│   ├── metro.config.js
│   ├── package.json
│   ├── tsconfig.json
│   ├── babel.config.js
│   ├── app.json
│   ├── expo-env.d.ts
│   ├── nativewind-env.d.ts
│   └── README.md
│
├── backend/
│   ├── app/
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── security.py
│   │   │
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   │   ├── chat.py
│   │   │   └── history.py
│   │   │
│   │   ├── schemas/
│   │   ├── utils/
│   │   └── data/
│   │       ├── error.index
│   │       └── metadata.json
│   │
│   ├── main.py
│   ├── requirements.txt
│   └── __pycache__/
│
├── ErrorSolution.ipynb
└── README.md
```

## 🧠 System Architecture

```
React Native Mobile App
            │
            ▼
       FastAPI Backend
            │
            ├── Clerk Authentication
            │
            ├── Generate Error Embeddings
            │      using Sentence Transformers
            │
            ├── Search Similar Errors
            │      using FAISS Index
            │
            ├── Retrieve Metadata
            │      from metadata.json
            │
            └── Return Related Fixes

```

## ⚙️ Tech Stack
# Frontend
- React Native
- Expo
- TypeScript
- NativeWind
- Axios


# Backend
- FastAPI
- Python
- Supabase
- Clerk Authentication
- FAISS
- Sentence Transformers
- Uvicorn

# AI / RAG
- Sentence Transformers
- FAISS Vector Search
- Semantic Similarity Search

## 🔐 Authentication

The backend uses Clerk JWT authentication for securing API routes.

Environment Variables

Create a .env file inside the backend/ directory:

```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

CLERK_SECRET_KEY=your_clerk_secret
CLERK_ISSUER=your_clerk_issuer
CLERK_JWKS_URL=your_clerk_jwks_url
```
## 🚀 Frontend Setup
Install Dependencies

```
🚀 Frontend Setup
Install Dependencies
```
Start Expo Server

```
npx expo start
```
## ⚡ Backend Setup
Create Virtual Environment
Linux / macOS

```
python -m venv venv

source venv/bin/activate
```
Windows

```
python -m venv venv

venv\Scripts\activate
```
Install Dependencies

```
cd backend

pip install -r requirements.txt
```
Run FastAPI Server
```
uvicorn main:app --reload
```
Backend runs on:

```
http://127.0.0.1:8000
```

## 🧠 RAG Pipeline

The project includes a notebook:
```
ErrorSolution.ipynb
```
This notebook is responsible for:

Loading developer errors dataset
Generating embeddings using Sentence Transformers
Creating FAISS vector index
Saving vectors into:


```
backend/app/data/error.index
```
Saving metadata into:
```
backend/app/data/metadata.json
```


## 🔍 Semantic Search Flow
- 1) User sends an error message from the mobile app
- 2) FastAPI backend receives the error
- 3) Backend converts the message into embeddings
- 4) FAISS searches for similar errors
- 5) Related fixes are retrieved from metadata
- 6) Response is returned to the application

## 📡 API Endpoints
Create Message
POST /message/create

Request:
```
{
  "message": "TypeError: undefined is not an object",
  "chat_id": null
}
```

Response:
```
{
  "chat_id": "chat_uuid",
  "response": [
    {
      "error": "Cannot read property map of undefined",
      "fix": "Check if array exists before mapping.",
      "score": 0.92
    }
  ]
}
```

Get User Chats
GET /chats

Returns all user chat history.

Get Chat By ID
GET /chat/{chat_id}

Returns a specific chat session.

## 🧠 Embedding Example
```
from sentence_transformers import SentenceTransformer

model = SentenceTransformer(
    "sentence-transformers/all-MiniLM-L6-v2"
)

embedding = model.encode(
    "Module not found error in React Native"
)
```
## 🔍 FAISS Search Example
```
import faiss

index = faiss.read_index(
    "backend/app/data/error.index"
)

D, I = index.search(query_embedding, k=5)
```


## 📚 Database

The application uses Supabase for:

- User chats
- User account
- Messages
- Chat history
- AI responses
## 🔮 Future Improvements
- 🤖 LLM integration for advanced RAG
- 🧠 Fine-tuned embedding models
- 🌐 Multi-platform support
- 📊 Analytics dashboard
- 💬 Real-time AI assistant
- ☁️ Cloud vector database
- 🧾 Auto error categorization
