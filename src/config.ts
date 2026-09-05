export const siteConfig = {
	name: "Daria Pavlova",
	title: "Daria Pavlova — Data Engineer | Python, SQL, ETL",
	description:
		"Daria Pavlova is a Data Engineer specializing in Python, SQL, ETL, financial data processing and data automation.",
	siteUrl: "https://dariapavlova.me/",
	githubUrl: "https://github.com/dariapavlova02",
	linkedinUrl: "https://www.linkedin.com/in/dariapavlova22/",
	cvUrl: "/about#cv",
	contactUrl: "/about#contact",
} as const;

export const contactChannels = [
	{ name: "Email", detail: "dashapavlova999@gmail.com", href: "mailto:dashapavlova999@gmail.com" },
	{ name: "LinkedIn", detail: "linkedin.com/in/dariapavlova22", href: siteConfig.linkedinUrl },
	{ name: "Telegram", detail: "@dashapavlova", href: "https://t.me/dashapavlova" },
] as const;
