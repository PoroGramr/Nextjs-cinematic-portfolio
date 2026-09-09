// ─────────────────────────────────────────────
//  WORK SECTION — edit everything here
// ─────────────────────────────────────────────

export const SECTION = {
  label: "Selected Work",
  heading: "Projects.",
};

export const FALLBACK_PROJECTS = [
  {
    id: null,
    num: "01",
    category: "AI",
    title: "On-Premise SIEM AI Platform",
    description:
      "A grounded security operations platform combining deterministic analysis, tool-calling agents, hybrid RAG, and evidence verification.",
    tech: "FastAPI · LangGraph · Elasticsearch · Qdrant · Ollama",
    image: "/photo/junseo-cyber-bg-v1.webp",
    link: null,
    review: null,
  },
  {
    id: null,
    num: "02",
    category: "Backend",
    title: "Audit Log API: 4,538ms → 23ms",
    description:
      "Improved a ten-million-row audit log query by replacing offset paging with cursor paging and validating an index-seek execution plan.",
    tech: "Spring Boot · MySQL · Cursor Pagination · Indexing",
    image: "/photo/project.webp",
    link: null,
    review: null,
  },
  {
    id: null,
    num: "03",
    category: "Backend",
    title: "Recommendation API & JVM Tuning",
    description:
      "Removed N+1 queries, batched data access, and tuned container-aware JVM memory to improve throughput and eliminate GC pauses.",
    tech: "Spring Boot · JPA · Docker · JVM · Prometheus",
    image: "/photo/about.webp",
    link: null,
    review: null,
  },
  {
    id: null,
    num: "04",
    category: "Platform",
    title: "Vue 2 → React 19 Migration",
    description:
      "Established a Turborepo and pnpm monorepo with shared UI, API, widget, and configuration packages for gradual SIEM modernization.",
    tech: "React 19 · TypeScript · Vite · Turborepo · pnpm",
    image: "/photo/contact.webp",
    link: null,
    review: null,
  },
  {
    id: null,
    num: "05",
    category: "Platform",
    title: "Redis Sentinel High Availability",
    description:
      "Resolved refresh-token inconsistency across distributed servers by introducing automatic failover and tested recovery scenarios.",
    tech: "Redis Sentinel · Spring Boot · Docker · Jenkins · AWS",
    image: "/photo/hero.webp",
    link: null,
    review: null,
  },
];
