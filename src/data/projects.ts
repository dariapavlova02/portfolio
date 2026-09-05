export type ArtifactKind = "pipeline" | "search" | "graph";

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
		slug: "nbu-registry-export",
		category: "Data infrastructure",
		title: "NBU Registry Export",
		description:
			"End-to-end export pipeline for approximately 500M records across multiple years of transactional data.",
		artifact: "pipeline",
		statement:
			"A large registry export shaped by data volume, bounded compute and explicit validation boundaries.",
		facts: [
			{
				label: "Public scale",
				value: "≈500,000,000",
				note: "records across a multi-year regulatory dataset",
			},
		],
		problem:
			"Exporting a multi-year registry at this scale changes the engineering problem: progress must be observable, work must stay bounded, and validation cannot be deferred until the end of the run.",
		approach: [
			"Partition extraction and transformation work so execution remains bounded and restartable.",
			"Keep validation as an explicit system boundary before publishing downstream data.",
			"Separate columnar output, object storage and analytical serving concerns.",
		],
		outcome:
			"The approximate record count is the only public measurement currently presented. Benchmark conditions, implementation details and repository access will be added only when they can be documented precisely.",
		system: "Extract / transform / validation / Parquet / S3 / StarRocks",
		evidenceNote: "Detailed case study in preparation",
	},
	{
		number: "02",
		slug: "hybrid-sanctions-search",
		category: "Search / NLP",
		title: "Hybrid Sanctions Search Engine",
		description:
			"Search system for sanctions data using hybrid retrieval, entity resolution and relevance ranking.",
		artifact: "search",
		statement:
			"A multilingual screening reference that keeps normalization, retrieval and review boundaries explicit.",
		facts: [
			{
				label: "Language handling",
				value: "EN / RU / UK",
				note: "names, organizations and mixed-script inputs",
			},
			{
				label: "Retrieval",
				value: "Hybrid",
				note: "exact, phrase and n-gram candidates with optional vector escalation",
			},
			{
				label: "Readiness boundary",
				value: "HTTP 503",
				note: "for empty or incompletely loaded screening indexes",
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
			"The public repository is an engineering reference and screening aid, not a legal decision system. It exposes the pipeline through FastAPI and documents deployment, provenance and readiness constraints.",
		system: "Python / FastAPI / Elasticsearch / multilingual NLP / optional vector search",
		repositoryUrl: "https://github.com/dariapavlova02/multilingual-sanctions-search",
	},
	{
		number: "03",
		slug: "semtrace",
		category: "Semantic systems / AI research",
		title: "SemTrace",
		description:
			"Research and applied work on semantic systems, knowledge graphs and LLM-powered tools.",
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
