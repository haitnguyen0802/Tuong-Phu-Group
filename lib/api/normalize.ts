type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

export function parseMaybeJson<T>(value: unknown): T | unknown {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value) as T;
  } catch {
    return value;
  }
}

export function normalizeJsonFields(value: unknown, keys: string[]): unknown {
  if (!isRecord(value)) return value;

  const output: UnknownRecord = { ...value };
  for (const key of keys) {
    if (key in output) {
      output[key] = parseMaybeJson(output[key]);
    }
  }
  return output;
}

export function pickFirst<T>(value: T | T[] | null | undefined): T | null {
  if (!value) return null;
  return Array.isArray(value) ? (value[0] ?? null) : value;
}

export function deepParseJsonStrings(value: unknown): unknown {
  if (typeof value === "string") {
    const trimmed = value.trim();
    const looksLikeJson =
      (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
      (trimmed.startsWith("[") && trimmed.endsWith("]"));
    if (!looksLikeJson) return value;

    try {
      return deepParseJsonStrings(JSON.parse(value));
    } catch {
      return value;
    }
  }

  if (Array.isArray(value)) {
    return value.map((entry) => deepParseJsonStrings(entry));
  }

  if (isRecord(value)) {
    const output: UnknownRecord = {};
    for (const [key, entry] of Object.entries(value)) {
      output[key] = deepParseJsonStrings(entry);
    }
    return output;
  }

  return value;
}
