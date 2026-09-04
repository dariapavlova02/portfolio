export type PublicationArtifact = "graph-evaluation" | "market-pipeline";

export interface PublicationFact {
	label: string;
	value: string;
	note: string;
}

export interface PublicationResults {
	columns: string[];
	rows: string[][];
	reading: string;
}

export interface Publication {
	number: string;
	slug: string;
	year: string;
	type: string;
	recordLabel: string;
	title: string;
	shortTitle: string;
	description: string;
	authors: string[];
	venue: string[];
	paperUrl: string;
	repositoryUrl?: string;
	artifact: PublicationArtifact;
	facts: PublicationFact[];
	question: string;
	context: string;
	method: string[];
	artifactNote: string;
	results: PublicationResults;
	limits: string[];
}

export const publications: Publication[] = [
	{
		number: "01",
		slug: "graph-based-defi-security",
		year: "2025",
		type: "Conference paper / corrected evaluation",
		recordLabel: "Research / evaluation record",
		title: "Graph-based feature engineering for DeFi security incident severity prediction",
		shortTitle: "Graph-based DeFi security prediction",
		description:
			"Published research followed by a stricter, reproducible evaluation of what the available graph evidence supports.",
		authors: ["Daria Pavlova", "Inna Novalija", "Dunja Mladenić"],
		venue: ["Information Society 2025", "Slovenian KDD Conference", "Ljubljana, Slovenia"],
		paperUrl: "https://aile3.ijs.si/dunja/SiKDD2025/Papers/IS2024_-_SIKDD_2025_paper_6.pdf",
		repositoryUrl: "https://github.com/dariapavlova02/defi-security-knowledge-graph",
		artifact: "graph-evaluation",
		facts: [
			{
				label: "Reported conference result",
				value: "0.598 → 0.787",
				note: "AUC reported by the 2025 paper using the archival conference profile.",
			},
			{
				label: "Corrected chronological holdout",
				value: "0.823 / 0.817",
				note: "Baseline / graph-enriched AUC under the timestamp-safe portfolio profile.",
			},
		],
		question:
			"Does protocol context known before a DeFi security incident improve the ranking of incidents by severe financial loss?",
		context:
			"The corrected experiment narrows the question to facts whose availability at prediction time can be demonstrated. Retrospective graph structure is not silently treated as historical evidence.",
		method: [
			"Build the corrected dataset from 1,608 normalized incidents dated 2011–2025.",
			"Split observations chronologically at 2023-07-28 and fix the severe-loss threshold from the training period.",
			"Require every graph feature to have an availability timestamp no later than the incident.",
			"Evaluate a chronological holdout and five expanding-window temporal folds.",
		],
		artifactNote:
			"Both models receive the same baseline inputs and deterministic LightGBM configuration. The enriched model adds only timestamp-eligible graph features.",
		results: {
			columns: ["Model", "Holdout AUC", "F1", "Precision", "Recall", "Temporal CV AUC"],
			rows: [
				["Baseline", "0.823", "0.545", "0.611", "0.491", "0.775 ± 0.090"],
				["Graph-enriched", "0.817", "0.513", "0.620", "0.438", "0.787 ± 0.074"],
			],
			reading:
				"Graph enrichment did not improve the chronological holdout. Temporal CV was slightly higher on average, but variance and threshold sensitivity prevent a strong predictive claim.",
		},
		limits: [
			"Three structural graph features are excluded because their historical availability is undocumented.",
			"Public incident coverage is incomplete and reported losses may be noisy or revised.",
			"Raw source records are not redistributed because redistribution rights have not been established.",
			"This is a research artifact, not a deployed risk-scoring or financial decision system.",
		],
	},
	{
		number: "02",
		slug: "interactive-defi-market-visualization",
		year: "2025",
		type: "Conference paper",
		recordLabel: "Research / applied visualization",
		title: "Using interactive data visualization for DeFi market analysis",
		shortTitle: "Interactive DeFi market visualization",
		description:
			"An automated multi-source ETL workflow and interactive analytical interface for examining DeFi market structure and movement.",
		authors: ["Daria Pavlova", "Inna Novalija"],
		venue: ["Information Society 2025", "Slovenian KDD Conference", "Ljubljana, Slovenia"],
		paperUrl: "https://aile3.ijs.si/dunja/SiKDD2025/Papers/IS2024_-_SIKDD_2025_paper_15.pdf",
		artifact: "market-pipeline",
		facts: [
			{
				label: "Reported full ETL",
				value: "45 s",
				note: "The paper also reports an 8-second incremental execution path.",
			},
			{
				label: "Reported coverage",
				value: "6,000+",
				note: "protocols processed through the DeFiLlama source path.",
			},
			{
				label: "Source APIs",
				value: "3",
				note: "CoinGecko, DeFiLlama and DexScreener.",
			},
		],
		question:
			"Can an automated data pipeline and coordinated visual views reduce the friction of examining DeFi market structure and short-term movement?",
		context:
			"The paper combines market and protocol data from three APIs, validates and transforms it into analytical outputs, and presents the result through synchronized Tableau views.",
		method: [
			"Collect token, protocol and exchange-pair data through three API clients with retry and backoff handling.",
			"Validate completeness, consistency, timeliness and outliers before transformation.",
			"Normalize timestamps, derive rolling features and aggregate market categories.",
			"Publish four analytical outputs for coordinated overview, time-series, movers and category views.",
		],
		artifactNote:
			"The figure follows the system described in the paper: three source APIs pass through explicit validation and transformation boundaries before analytical delivery.",
		results: {
			columns: ["Measurement", "Reported value", "Conditions stated in the paper"],
			rows: [
				["Full ETL execution", "45 s", "Complete multi-source pipeline"],
				["Incremental execution", "8 s", "Incremental update path"],
				["Initial dashboard load", "3.2 s ± 0.5", "n = 100"],
				["Filter operation", "1.8 s ± 0.3", "Interactive dashboard"],
				["Peak memory", "256 MB", "Reported pipeline run"],
			],
			reading:
				"These are measurements reported in the publication. A public reproducibility package is not currently linked here, so the portfolio does not present them as independently revalidated benchmarks.",
		},
		limits: [
			"The paper notes that rehypothecation can inflate TVL measurements by 20–30%.",
			"Source APIs may lag by 5–15 minutes during high-volatility periods.",
			"The reported coverage excludes protocols below $1M TVL.",
			"User-efficiency and use-case claims remain paper-reported until their underlying evaluation artifacts are made public.",
		],
	},
];

export function getPublication(slug: string): Publication | undefined {
	return publications.find((publication) => publication.slug === slug);
}
