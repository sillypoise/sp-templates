const STAGES = [
	"production",
	"staging",
	"development",
	"preview",
	"ci",
	"qa",
] as const;
export type Stage = (typeof STAGES)[number];

function notEmpty<T>(value: T | null | undefined): value is T {
	return value !== null && value !== undefined;
}

function isStage(value: string): value is Stage {
	return STAGES.includes(value as Stage);
}

export const stage: Stage = (() => {
	const candidates = [process.env.NODE_ENV, process.env.APP_ENV]
		.filter(notEmpty)
		.filter(isStage);

	if (candidates.includes("production")) return "production";
	return candidates[0] ?? "production";
})();
