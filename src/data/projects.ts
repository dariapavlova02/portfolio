export type ArtifactKind = "pipeline" | "search" | "graph";

export interface ProjectFact {
	label: string;
	value: string;
	/** Numeric target for count-up animation. Omit for non-numeric values. */
	count?: number;
	prefix?: string;
	suffix?: string;
}

export interface Project {
	number: string;
	slug: string;
	category: string;
	title: string;
	description: string;
	artifact: ArtifactKind;
	repositoryUrl?: string;
	/** One-line statement used on the case-study page and the home index. */
	statement: string;
	facts: ProjectFact[];
	problem: string;
	approach: string[];
	outcome: string;
	stack: string[];
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
			"A regulatory export that had to be correct once, on hardware that could not hold the data twice.",
		facts: [
			{ label: "Records", value: "≈500,000,000", count: 500_000_000, prefix: "≈" },
			{ label: "Years covered", value: "Multi-year", },
			{ label: "Output", value: "Parquet → S3 → StarRocks" },
		],
		problem:
			"A national-bank registry required a multi-year export of transactional data with strict validation rules. The full dataset did not fit in memory and the export window was limited, so the pipeline had to stream, validate and write in bounded batches without losing referential consistency between years.",
		approach: [
			"Chunked extraction keyed on time ranges, so each batch is independently restartable.",
			"Schema-enforced transforms with validation gates between stages; failures are quarantined, not dropped.",
			"Columnar Parquet output partitioned for downstream StarRocks queries, staged through S3.",
			"Observable progress and reconciliation counts at every stage so the final totals can be audited.",
		],
		outcome:
			"The export completed within memory and compute limits with reconciled record counts across every stage. The pipeline is rerunnable per partition, which turned a one-off deliverable into a repeatable process.",
		stack: ["Python", "Parquet", "S3", "StarRocks", "PostgreSQL"],
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
			"Finding the right sanctioned entity when names are transliterated, aliased and deliberately obscured.",
		facts: [
			{ label: "Retrieval", value: "Lexical + semantic" },
			{ label: "Resolution", value: "Entity-level" },
			{ label: "Ranking", value: "Learned relevance" },
		],
		problem:
			"Sanctions lists contain names in multiple scripts, partial identifiers and many aliases. Pure keyword search misses transliteration variants; pure vector search returns plausible-but-wrong neighbours. Compliance work needs both high recall and an explainable match.",
		approach: [
			"Query understanding normalises scripts, splits identifiers and detects entity type before retrieval.",
			"Candidate retrieval runs lexical and embedding search in parallel, then merges candidate sets.",
			"Entity resolution collapses candidates to canonical entities using aliases and identifiers.",
			"A ranking stage scores entities against the query and surfaces the supporting source record.",
		],
		outcome:
			"Each result is a matched entity with the alias, identifier and source record that justified it, so a reviewer can verify the match instead of trusting a score.",
		stack: ["Python", "Elasticsearch", "Sentence embeddings", "FastAPI"],
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
			"Encoding how DeFi protocols relate — forks, deployments, incidents — so risk can be read from the graph.",
		facts: [
			{ label: "Protocols", value: "892", count: 892 },
			{ label: "Incidents", value: "1,608", count: 1608 },
			{ label: "Edges", value: "3,500+", count: 3500, suffix: "+" },
		],
		problem:
			"Security incidents in decentralised finance are usually analysed one at a time. The relationships between protocols — shared code through forks, shared exposure through multi-chain deployment — carry risk information that incident-level data cannot show.",
		approach: [
			"A semi-automated pipeline builds a Neo4j knowledge graph from Rekt, DeFiLlama and SlowMist data.",
			"Fork lineage, deployment and incident relations are modelled as typed edges.",
			"Graph-derived features are computed strictly from pre-incident state to avoid leakage.",
			"Features feed a gradient-boosting classifier for incident severity prediction.",
		],
		outcome:
			"Graph features lifted AUC from 0.598 to 0.787 over an incident-only baseline. The work is published at Information Society 2025 and is documented on the research page.",
		stack: ["Neo4j", "Python", "LightGBM", "Knowledge graphs"],
	},
];

export function getProject(slug: string): Project | undefined {
	return projects.find((project) => project.slug === slug);
}
