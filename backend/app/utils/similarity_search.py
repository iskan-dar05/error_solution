from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import json


model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

# Load FAISS index
index = faiss.read_index("error.index")

# Load metadata
with open("metadata.json") as f:
	metadata_map = json.load(f)


def search(query, top_k=5):
	query_embeeding = model.encode([query], normalize_embeddings=True, convert_to_numpy=True).astype("float32")

	# Search
	scores, indices = index.search(query_embeeding, top_k)
	results = []

	for score, idx in zip(scores[0], indices[0]):
		results.append({
			"score": float(score),
			"data": metadata_map[idx]
			})

	return results
