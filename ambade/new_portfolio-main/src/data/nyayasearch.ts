// Nyaya Search, kept in code until it is added to Sanity
// (sanity-drafts/nyayasearch.ndjson holds the same entries for import).
// Facts and figures come from github.com/aadi-novice/nyaya-search:
// README.md, docs/designs/nyaya_search.md and docs/eval_results.md.

let n = 0;
const key = () => `k${++n}`;
const span = (text: string) => ({ _type: 'span', _key: key(), text, marks: [] });
const p = (text: string, style = 'normal') => ({ _type: 'block', _key: key(), style, markDefs: [], children: [span(text)] });
const h3 = (text: string) => p(text, 'h3');
const li = (text: string) => ({ ...p(text), listItem: 'bullet', level: 1 });
const quote = (text: string, attribution: string) => ({ _type: 'calloutBlock', _key: key(), quote: text, attribution });
const image = (imageUrl: string, caption: string, altText: string) => ({ _type: 'imageBlock', _key: key(), imageUrl, caption, altText });
const spec = (specs: [string, string][]) => ({ _type: 'techSpecBlock', _key: key(), specs: specs.map(([label, value]) => ({ label, value })) });

const REPO = 'https://github.com/aadi-novice/nyaya-search';

export const nyayasearch = {
  _id: 'local-nyayasearch',
  title: 'Nyaya Search',
  slug: { current: 'nyaya-search' },
  description: 'Cited legal research over Indian Supreme Court judgments, where code, not the model, checks every quote.',
  imageUrl: '/images/nyaya/nyaya-search.jpg',
  phoneImageUrl: '/images/nyaya/nyaya-search.jpg',
  tags: ['RAG', 'Legal search', 'Python', 'PostgreSQL + pgvector'],
  githubUrl: REPO,
  date: '2026-11',
  publishedAt: '2026-11-19T12:00:00+05:30',
  body: [
    h3('What it does'),
    p('Nyaya Search answers a lawyer’s research question from the 2010 to 2026 judgments of the Supreme Court of India. Each sentence of an answer cites a retrieved passage and quotes it word for word, and a citation check written in code confirms that each quote really is in that passage before the sentence is shown. When the evidence is too weak, it refuses (“no relevant judgment found”) instead of guessing.'),
    image('/images/nyaya/nyaya-search.jpg', 'A live answer: every sentence carries a checked quote and a citation built from the passage’s metadata', 'Nyaya Search answering whether a conviction can rest solely on an uncorroborated dying declaration, with quoted, cited passages'),
    h3('How it works'),
    li('Corpus: the AWS Open Data “Indian Supreme Court Judgments” set (CC BY 4.0), a manifest of 38,397 distinct judgments; the indexed 2010 to 2026 slice is 13,007 judgments in 296,151 chunks.'),
    li('Parsing by layout era with PyMuPDF word coordinates, then zoning into header, issue, Held points, judgment and opinions.'),
    li('Chunks follow the judgment’s own structure (opinion, then numbered paragraph), so a citation names the paragraph a lawyer will look up.'),
    li('Hybrid retrieval: BM25 top 50 and Qwen3-Embedding vectors top 50 in PostgreSQL + pgvector, fused with reciprocal rank fusion, then reranked by Qwen3-Reranker.'),
    li('The answer model returns JSON sentences, each with an 8 to 40 word quote; the citation a reader sees is built by code from the passage’s metadata, never written by the model.'),
    li('A FastAPI service with /search and /ask, and a plain HTML, CSS and JavaScript front end with no build step. It runs on one PC with a 6 GB GPU.'),
    h3('Stack'),
    spec([
      ['Language', 'Python 3.12, uv, ruff, pytest, GitHub Actions'],
      ['Retrieval', 'bm25s, PostgreSQL 17 + pgvector HNSW, Qwen3-Embedding-0.6B, Qwen3-Reranker-0.6B'],
      ['Answering', 'gpt-oss-120b on Groq, with a judge from a different model family'],
      ['Serving', 'FastAPI, Docker Compose, plain HTML, CSS and JavaScript'],
      ['Tests', '57 test files, 782 test functions'],
    ]),
    h3('Status'),
    p('The headline results are development numbers: the dev set has not been hand-checked yet, and no final test set exists. The write-ups in the journal give the design and the numbers in full.'),
  ],
};

const postCitations = {
  _id: 'local-post-nyaya-citations',
  title: 'Code, not the model, checks every quote',
  slug: { current: 'nyaya-search-citations' },
  author: 'Aditya Ambade',
  publishedAt: '2026-11-19T12:00:00+05:30',
  excerpt: 'How Nyaya Search keeps a language model from inventing a Supreme Court citation.',
  imageUrl: '/images/nyaya/nyaya-search.jpg',
  tags: ['Nyaya Search', 'RAG', 'Legal AI'],
  body: [
    p('A wrong citation in a legal answer is worse than no answer. A lawyer who trusts it walks into court with a paragraph the judgment never contained. So I built Nyaya Search, a research tool over the Supreme Court of India’s judgments, around one rule: the model may write the sentence, but code decides whether the sentence is shown.'),
    h3('The citation lock'),
    p('The answer model sees eight retrieved passages, labelled P1 to P8. It returns JSON: each sentence names the passage it relies on and copies a quote of 8 to 40 words from it. Before anything reaches the screen, a citation check in code confirms that the quote really is in that passage. A sentence that fails goes to an unverified list that never carries citation details.'),
    p('The citation a reader sees (the case, the S.C.R. citation, the paragraph, the page) is never written by the model. Code builds it from the passage’s own metadata.'),
    quote('code, not the LLM, decides which sentences are shown (safety-critical)', 'answer/citation_check.py'),
    h3('Alternatives I turned down'),
    li('Free-form answers checked afterwards: a check after generation can confirm only that a named case exists, not that it says what the answer claims.'),
    li('Labels without quotes: an exact quote at least proves which words the sentence relies on.'),
    li('Fixed token windows or semantic chunking: chunks follow the judgment’s numbered paragraphs instead, so a citation names the paragraph a lawyer will look up.'),
    h3('Retrieval that earns the quote'),
    p('A quote can only be checked against a passage that was retrieved, so retrieval carries half the weight. A question goes to BM25 and to Qwen3 embeddings in pgvector, top 50 each, fused by reciprocal rank fusion and reranked by Qwen3-Reranker. A citation such as 2025 INSC 31 skips search and the model entirely and goes straight to an alias lookup.'),
    p('I moved the keyword leg from Postgres full-text search to BM25 because Postgres full-text search has no inverse document frequency. On the development set it found the right judgment in the top 50 for 20% of questions (75% after a ranking fix), against BM25’s 80%.'),
    h3('Refusing on purpose'),
    p('When the reranker’s best score falls under a threshold, the system answers “no relevant judgment found”. The threshold is tuned per reranker, under the rule that at most 10% of answerable questions may be refused, and it is stored with the index version, not in code.'),
    image('/images/nyaya/results-gates-light.jpg', 'Release gates on the development set, from docs/eval_results.md', 'Chart of Nyaya Search release-gate results'),
    p('The whole thing runs on one PC with a 6 GB GPU. The design, the alternatives and eight design reviews are in the repository.'),
  ],
};

const postNumbers = {
  _id: 'local-post-nyaya-numbers',
  title: 'Nyaya Search, by the numbers',
  slug: { current: 'nyaya-search-numbers' },
  author: 'Aditya Ambade',
  publishedAt: '2026-11-19T18:00:00+05:30',
  excerpt: 'What passes, what fails, and what is not measured yet.',
  imageUrl: '/images/nyaya/results-retrieval-light.jpg',
  tags: ['Nyaya Search', 'Evaluation'],
  body: [
    p('These are development numbers. The dev set is a draft that has not been hand-checked yet, and no final test set exists. I publish them because the failures are as useful as the passes.'),
    h3('The gates'),
    spec([
      ['G1 citation integrity', '0 violations in 186 sentences; 39% of model sentences failed the exact quote check and were hidden (pass)'],
      ['G2 answer quality', '72.6%, 82 of 113; judge not yet validated (fail)'],
      ['G3 retrieval', '84% top 50, 73% top 5 (fail)'],
      ['G5 refusal', '100% of unanswerable refused (pass); 18.6% of answerable refused (fail)'],
      ['G6 index', '100% integrity, 99.97% size compliance'],
      ['G7 latency', 'p95 9.4 s, median 6.7 s (rerank 3.6 s, model 2.9 s)'],
      ['G8 errors', '0 hallucinations, 11 retrieval errors, 20 reasoning errors'],
      ['G9 adversarial', '18 of 20; all 7 injections blocked'],
    ]),
    image('/images/nyaya/results-retrieval-light.jpg', 'Retrieval on the development set', 'Chart of Nyaya Search retrieval results'),
    h3('What the failures say'),
    p('The answer model paraphrases quotes it should copy. The exact check then hides those sentences, which also explains about half of the wrong refusals. That is the citation lock doing its job, and it is the first thing to improve: a second prompt version and quote snapping are built, and quote snapping stays off by default because its gain is estimated from stand-ins and is small.'),
    h3('RAGAS, as a second opinion'),
    spec([
      ['Faithfulness', '0.887'],
      ['Answer relevancy', '0.641'],
      ['Context precision', '0.800'],
      ['Context recall', '0.760'],
    ]),
    p('RAGAS faithfulness is an estimate; the quote check is exact. So RAGAS is a secondary, comparable number, and never a gate.'),
    image('/images/nyaya/results-latency-light.jpg', 'Latency per stage', 'Chart of Nyaya Search latency by stage'),
    h3('Still to do'),
    li('A final, hand-checked test set'),
    li('Validating the judge against my own labels'),
    li('A complete latency run (the last one stopped at a free-tier daily quota)'),
    li('Indexing the 1964 to 2009 judgments, which are parsed but not yet in the index'),
  ],
};

export const nyayaPosts = [postNumbers, postCitations];
