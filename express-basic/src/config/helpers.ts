// src/config/helpers.ts

export function envToStr(value: string | undefined, defaultValue = ""): string {
	return value === undefined ? defaultValue : value;
}

export function envToNumber(
	value: string | undefined,
	defaultValue: number,
): number {
	const parsed =
		value === undefined || value === "" ? defaultValue : Number(value);
	return Number.isNaN(parsed) ? defaultValue : parsed;
}

export function envToBool(value: string | undefined): boolean {
	if (!value) return false;
	return ["true", "1", "yes"].includes(value.toLowerCase());
}
