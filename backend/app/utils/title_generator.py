from keybert import KeyBERT


def generate_title(text: str):
	kw_model = KeyBERT()
	keywords = kw_model.extract_keywords(text, top_n=3)

	return " ".join(k[0] for k in keywords)




