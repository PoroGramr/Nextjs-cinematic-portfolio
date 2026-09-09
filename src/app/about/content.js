// ─────────────────────────────────────────────
//  JUNSEO PARK — ABOUT & RESUME CONTENT
// ─────────────────────────────────────────────

import {
  SiDocker,
  SiElasticsearch,
  SiFastapi,
  SiGithubactions,
  SiGooglecloud,
  SiGrafana,
  SiJenkins,
  SiLangchain,
  SiMysql,
  SiOllama,
  SiPostgresql,
  SiPrometheus,
  SiPython,
  SiReact,
  SiRedis,
  SiSpringboot,
} from "react-icons/si";
import { FaAws, FaJava } from "react-icons/fa";

export const SECTION = {
  label: "About Me",
};

export const HEADING = {
  line1: "Engineering",
  line2: "intelligence",
  line3: "into systems.",
};

// *word* = highlighted/italic in rendered copy
export const BIO = [
  "I am *Junseo Park*, a full-stack and AI developer who goes beyond feature delivery to build systems that remain fast, reliable, and explainable in production.",
  "At Innerbus, I work across a React-based frontend migration, Spring Boot BFF performance improvements, and an on-premise *SIEM security AI platform*. I combine deterministic analysis, tool-calling agents, RAG, and evidence verification to keep AI outputs grounded in operational data.",
  "I value clear communication and shared problem solving. My goal is to be the kind of engineer teammates trust—someone who finds the real bottleneck, explains the trade-offs, and improves both the product and the way the team works together.",
];

export const RESUME_URL = "/resume.pdf";

export const TECH = [
  { name: "Spring Boot", icon: SiSpringboot },
  { name: "FastAPI", icon: SiFastapi },
  { name: "Java", icon: FaJava },
  { name: "Python", icon: SiPython },
  { name: "React 19", icon: SiReact },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MySQL", icon: SiMysql },
  { name: "Redis", icon: SiRedis },
  { name: "Elasticsearch", icon: SiElasticsearch },
];

export const CREATIVE = [
  { name: "LangGraph", icon: SiLangchain },
  { name: "LangChain", icon: SiLangchain },
  { name: "Ollama", icon: SiOllama },
  { name: "Docker", icon: SiDocker },
  { name: "Jenkins", icon: SiJenkins },
  { name: "GitHub Actions", icon: SiGithubactions },
  { name: "AWS", icon: FaAws },
  { name: "GCP", icon: SiGooglecloud },
  { name: "Prometheus", icon: SiPrometheus },
  { name: "Grafana", icon: SiGrafana },
];

export const EXPERIENCE = [
  { role: "Full Stack & AI Agent Developer · Innerbus", period: "2026.03 – Present" },
  { role: "Research Intern · NSHC LLVM Labs", period: "2024.03 – 2024.06" },
  { role: "Cyber Security Operator · Republic of Korea Air Force", period: "2021.01 – 2022.10" },
];
