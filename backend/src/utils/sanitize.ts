/** Normalises a value into a trimmed, de-duplicated list of non-empty strings. */
export function toArray(value: unknown): string[] {
  if (value === undefined || value === null || value === "") return [];
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter((item) => item.length > 0);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }
  return [String(value).trim()];
}

/** Coerces common truthy/falsy representations into a boolean. */
export function toBoolean(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value === "true" || value === "1";
  if (typeof value === "number") return value !== 0;
  return false;
}

/** Parses an optional integer from a query string value. */
export function toOptionalInt(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return Math.trunc(value);
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) return undefined;
    return Math.trunc(parsed);
  }
  return undefined;
}
