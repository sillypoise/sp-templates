export function envToStr(value: string | undefined): string | undefined {
	return value;
}

export function envToNumber(value: string | undefined): number | undefined {
	if (value === undefined || value === "") return undefined;
	const parsed = Number(value);
	return Number.isNaN(parsed) ? undefined : parsed;
}

export function envToBool(value: string | undefined): boolean {
	if (!value) return false;
	return ["true", "1", "yes"].includes(value.toLowerCase());
}
