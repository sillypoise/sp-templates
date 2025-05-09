export function envToStr<T extends string = string>(
  value: string | undefined,
): T | undefined {
  return value as T | undefined;
}

export function envToNumber<T extends number = number>(
  value: string | undefined,
): T | undefined {
  const parsed = Number(value);
  return value === undefined || Number.isNaN(parsed)
    ? undefined
    : (parsed as T);
}

export function envToBool(value: string | undefined): boolean {
  if (!value) return false;
  return ["true", "1", "yes"].includes(value.toLowerCase());
}
