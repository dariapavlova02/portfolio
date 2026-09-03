export type ArtifactKind = "pipeline" | "search" | "graph";

export interface Project {
	number: string;
	slug: string;
	category: string;
	title: string;
	description: string;
	artifact: ArtifactKind;
	repositoryUrl?: string;
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
	},
	{
		number: "02",
		slug: "hybrid-sanctions-search",
		category: "Search / NLP",
		title: "Hybrid Sanctions Search Engine",
		description:
			"Search system for sanctions data using hybrid retrieval, entity resolution and relevance ranking.",
		artifact: "search",
	},
	{
		number: "03",
		slug: "semtrace",
		category: "Semantic systems / AI research",
		title: "SemTrace",
		description:
			"Research and applied work on semantic systems, knowledge graphs and LLM-powered tools.",
		artifact: "graph",
	},
];
