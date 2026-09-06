export type ArtifactKind = "search" | "discovery" | "graph";

export interface ProjectFact {
	label: string;
	value: string;
	note: string;
}

export interface Project {
	number: string;
	slug: string;
	category: string;
	title: string;
	description: string;
	artifact: ArtifactKind;
	statement: string;
	facts: ProjectFact[];
	problem: string;
	approach: string[];
	outcome: string;
	system: string;
	repositoryUrl?: string;
	researchUrl?: string;
	evidenceNote?: string;
}

export const projects: Project[] = [
	{
		number: "01",
		slug: "multilingual-sanctions-search",
		category: "Search / NLP",
		title: "Multilingual Sanctions Search",
		description:
			"Multilingual sanctions screening with lexical and vector search, source identity evidence, and reproducible NLP pipelines.",
		artifact: "search",
		statement:
			"A multilingual screening reference that keeps normalization, retrieval and human review boundaries explicit.",
		facts: [
			{
				label: "Language handling",
				value: "EN / RU / UK",
				note: "normalized names, aliases and mixed-script inputs",
			},
			{
				label: "Retrieval",
				value: "Lexical + vector",
				note: "exact and fuzzy candidates with optional semantic escalation",
			},
			{
				label: "Reference suite",
				value: "1,739 passed",
				note: "with two optional FAISS checks skipped in the recorded local run",
			},
		],
		problem:
			"Sanctions screening has to reconcile spelling variants, aliases, initials, identifiers and multiple scripts. A plausible similarity score is not enough: the result must retain the signals and source record needed for human review.",
		approach: [
			"Validate the request, detect language and normalize Unicode, names and entity fields.",
			"Retrieve exact, phrase and n-gram candidates before optional semantic escalation.",
			"Fuse candidates, resolve entities and return reviewable supporting signals.",
			"Fail closed when the screening index is unavailable or incomplete.",
		],
		outcome:
			"The public repository is an engineering reference and screening aid. The recorded local reference suite checks implementation behavior; it does not establish search precision, recall or legal suitability.",
		system: "Python / FastAPI / Elasticsearch / multilingual NLP / optional vector search",
		repositoryUrl: "https://github.com/dariapavlova02/multilingual-sanctions-search",
	},
	{
		number: "02",
		slug: "tender-vendor-discovery",
		category: "Procurement intelligence",
		title: "Tender Vendor Discovery",
		description:
			"Procurement research pipeline for tender document processing, supplier discovery, contact enrichment and evidence review.",
		artifact: "discovery",
		statement:
			"A review-oriented workflow that turns tender documents into traceable supplier candidates and supporting evidence.",
		facts: [
			{
				label: "Candidate limit",
				value: "500",
				note: "default maximum entering enrichment and assessment in one run",
			},
			{
				label: "Document inputs",
				value: "PDF / DOCX / XLSX",
				note: "tender requirements extracted from common office formats",
			},
			{
				label: "Review outputs",
				value: "CSV / XLSX / JSON",
				note: "portable evidence for analyst review and handoff",
			},
		],
		problem:
			"Tender requirements are distributed across documents, while supplier evidence is fragmented across registries and the open web. Manual discovery is slow, repetitive and difficult to audit consistently.",
		approach: [
			"Extract product requirements and search terms from tender documents.",
			"Build supplier candidates from company registries and web search, then deduplicate and filter them.",
			"Enrich company and contact records before applying relevance assessment.",
			"Preserve source evidence and export reviewable records for analyst decisions.",
		],
		outcome:
			"The workflow was used in a commercial procurement setting. The public repository documents the implementation, while current external API compatibility and recommendation quality still require environment-specific evaluation.",
		system: "Python / Streamlit / SQLAlchemy / PostgreSQL or SQLite / OpenAI / Serper",
		repositoryUrl: "https://github.com/dariapavlova02/tender-vendor-discovery",
	},
	{
		number: "03",
		slug: "defi-security-knowledge-graph",
		category: "Graph ML / Research",
		title: "DeFi Security Knowledge Graph",
		description:
			"Leakage-aware graph feature engineering for DeFi security incident severity analysis.",
		artifact: "graph",
		statement:
			"A leakage-aware test of whether graph-derived protocol context adds signal to DeFi incident severity classification.",
		facts: [
			{
				label: "Corrected dataset",
				value: "1,608",
				note: "normalized incidents from 2011–2025",
			},
			{
				label: "Chronological holdout AUC",
				value: "0.823 / 0.817",
				note: "baseline / graph-enriched",
			},
			{
				label: "Temporal CV AUC",
				value: "0.775 / 0.787",
				note: "baseline / graph-enriched mean; uncertainty remains material",
			},
		],
		problem:
			"The research asks whether protocol context known before an incident improves the ranking of severe financial-loss events. The central constraint is temporal validity: graph facts cannot be used unless their availability before the incident can be demonstrated.",
		approach: [
			"Use the same deterministic LightGBM configuration and baseline inputs for both models.",
			"Admit a graph feature only when its availability timestamp is no later than the incident.",
			"Evaluate on a chronological holdout and five expanding-window validation folds.",
			"Keep conference reproduction and corrected portfolio evaluation as separate profiles.",
		],
		outcome:
			"Graph enrichment did not improve the corrected chronological holdout. Temporal cross-validation was slightly higher on average, but the result was not consistent enough to support a strong predictive claim.",
		system: "Python / LightGBM / Neo4j / chronological validation / reproducible artifacts",
		repositoryUrl: "https://github.com/dariapavlova02/defi-security-knowledge-graph",
		researchUrl: "/research/graph-based-defi-security",
	},
];

export function getProject(slug: string): Project | undefined {
	return projects.find((project) => project.slug === slug);
}
