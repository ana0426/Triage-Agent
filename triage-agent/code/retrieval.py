from typing import List, Dict, Tuple
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from rank_bm25 import BM25Okapi
import numpy as np


class HybridRetriever:
    def __init__(self, chunks: List[Dict]):
        self.chunks = chunks
        self.texts = [c["text"] for c in chunks]
        self.sources = [c["source"] for c in chunks]

        if not self.texts:
            self.tfidf = None
            self.tfidf_matrix = None
            self.bm25 = None
            return

        self.tfidf = TfidfVectorizer(
            ngram_range=(1, 2),
            max_features=10000,
            stop_words="english"
        )
        self.tfidf_matrix = self.tfidf.fit_transform(self.texts)

        tokenized = [t.lower().split() for t in self.texts]
        self.bm25 = BM25Okapi(tokenized)

    def retrieve(
        self,
        query: str,
        company: str = None,
        top_k: int = 5
    ) -> Tuple[List[Dict], float]:
        if not self.texts or self.tfidf is None:
            return [], 0.0

        candidate_indices = list(range(len(self.chunks)))
        if company and company != "Generic":
            filtered = [
                i for i in candidate_indices
                if self.chunks[i]["source"].lower() == company.lower()
            ]
            if filtered:
                candidate_indices = filtered

        if not candidate_indices:
            return [], 0.0

        query_lower = query.lower()
        query_tokens = query_lower.split()

        query_vec = self.tfidf.transform([query])
        candidate_matrix = self.tfidf_matrix[candidate_indices]
        tfidf_scores = cosine_similarity(query_vec, candidate_matrix).flatten()

        candidate_texts_tokenized = [
            self.chunks[i]["text"].lower().split()
            for i in candidate_indices
        ]
        local_bm25 = BM25Okapi(candidate_texts_tokenized)
        bm25_raw = local_bm25.get_scores(query_tokens)
        bm25_max = bm25_raw.max() if bm25_raw.max() > 0 else 1.0
        bm25_scores = bm25_raw / bm25_max

        hybrid_scores = 0.5 * tfidf_scores + 0.5 * bm25_scores

        top_n = min(top_k, len(candidate_indices))
        top_local_idxs = np.argsort(hybrid_scores)[::-1][:top_n]
        top_global_idxs = [candidate_indices[i] for i in top_local_idxs]
        top_scores = [hybrid_scores[i] for i in top_local_idxs]

        results = []
        for global_idx, score in zip(top_global_idxs, top_scores):
            chunk = dict(self.chunks[global_idx])
            chunk["score"] = float(score)
            results.append(chunk)

        avg_confidence = float(np.mean(top_scores)) if top_scores else 0.0
        return results, avg_confidence
