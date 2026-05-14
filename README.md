## Error Solution AI 🚀


AI-powered mobile application for developers that analyzes programming errors and returns similar fixes using semantic search and a simple RAG (Retrieval-Augmented Generation) system.

The project consists of a React Native Android app built with Expo and a FastAPI backend that uses Sentence Transformers and FAISS for intelligent error similarity matching.



## ✨ Features
📱 React Native Android application
⚡ FastAPI backend API
🔐 Authentication with Clerk
☁️ Supabase database integration
🧠 Semantic error embeddings using Sentence Transformers
🔍 Similarity search using FAISS
📚 Persistent error vector storage
💬 Chat-based developer experience
🧾 Chat history saving
⚡ Fast semantic retrieval pipeline

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
Frontend
React Native
Expo
TypeScript
NativeWind
Axios


