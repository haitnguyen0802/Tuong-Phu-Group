import { z } from "zod";
import { ApiError } from "@/lib/api/errors";
import { deepParseJsonStrings } from "@/lib/api/normalize";
import { fetchApiJson } from "./client";
import { mapFormatsCatalog } from "./mappers";
import {
  cmsArticleSchema,
  cmsCertificationSchema,
  cmsFormatsCatalogSchema,
  cmsFormatsCatalogStatusSchema,
  cmsIngredientSchema,
  cmsNavigationSchema,
  cmsProductSchema,
  cmsSectionHeadingSchema,
  cmsSlideSchema,
  cmsSocialMetaSchema,
  cmsSocialPostSchema,
} from "./schemas";
import type { CmsHomepageResponse, CmsSocialMeta } from "./types";
import type { FormatsCatalog } from "@/types";

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

function readArray<T>(payload: unknown, key: string): T[] {
  if (Array.isArray(payload)) return payload as T[];
  if (!isRecord(payload)) return [];
  const direct = payload[key];
  if (Array.isArray(direct)) return direct as T[];
  if (isRecord(direct) && Array.isArray(direct.items)) return direct.items as T[];
  return [];
}

function parseArray<T>(input: unknown[] | undefined, schema: z.ZodType<T>) {
  if (!input) return [] as T[];
  const output: T[] = [];
  for (const item of input) {
    const parsed = schema.safeParse(deepParseJsonStrings(item));
    if (parsed.success) output.push(parsed.data);
  }
  return output;
}

function parseOne<T>(input: unknown, schema: z.ZodType<T>): T | null {
  const parsed = schema.safeParse(deepParseJsonStrings(input));
  return parsed.success ? parsed.data : null;
}

export const API_QUERIES = {
  homepage:
    "/homepage?sections=slides,products,ingredients,certifications,articles,socialPosts,social",
  slides: "/homepage?sections=slides",
  products: "/products",
  ingredients: "/ingredients",
  certifications: "/certifications",
  articles: "/articles",
  socialPosts: "/social-posts",
  socialMeta: "/social-meta",
  formatsCatalog: "/formats-catalog",
  formatsCatalogStatus: "/formats-catalog/status",
} as const;

/** @deprecated Use API_QUERIES */
export const CMS_QUERIES = API_QUERIES;

export function parseHomepagePayload(raw: unknown): CmsHomepageResponse {
  const payload = deepParseJsonStrings(raw);
  if (!isRecord(payload)) return {};

  const result: CmsHomepageResponse = {};

  if ("slides" in payload) {
    result.slides = parseArray(readArray<unknown>(payload, "slides"), cmsSlideSchema);
  }
  if ("products" in payload) {
    result.products = parseArray(readArray<unknown>(payload, "products"), cmsProductSchema);
  }
  if ("ingredients" in payload) {
    result.ingredients = parseArray(readArray<unknown>(payload, "ingredients"), cmsIngredientSchema);
  }
  if ("certifications" in payload) {
    result.certifications = parseArray(
      readArray<unknown>(payload, "certifications"),
      cmsCertificationSchema,
    );
  }
  if ("articles" in payload) {
    result.articles = parseArray(readArray<unknown>(payload, "articles"), cmsArticleSchema);
  }
  if ("socialPosts" in payload) {
    result.socialPosts = parseArray(readArray<unknown>(payload, "socialPosts"), cmsSocialPostSchema);
  }
  if ("social" in payload) {
    const social = parseOne(payload.social, cmsSocialMetaSchema);
    if (social) result.social = social;
  }
  if ("sectionHeadings" in payload) {
    result.sectionHeadings = parseArray(
      readArray<unknown>(payload, "sectionHeadings"),
      cmsSectionHeadingSchema,
    );
  }
  if ("navigation" in payload) {
    const navigation = parseOne(payload.navigation, cmsNavigationSchema);
    if (navigation) result.navigation = navigation;
  }

  return result;
}

export async function queryHomepagePayload(): Promise<CmsHomepageResponse> {
  const raw = await fetchApiJson<unknown>(API_QUERIES.homepage);
  return parseHomepagePayload(raw);
}

export async function querySlides() {
  const raw = await fetchApiJson<unknown>(API_QUERIES.slides);
  return parseArray(readArray<unknown>(deepParseJsonStrings(raw), "slides"), cmsSlideSchema);
}

export async function queryProducts() {
  const payload = await fetchApiJson<unknown>(API_QUERIES.products);
  const candidates = readArray<unknown>(payload, "products");
  return parseArray(candidates, cmsProductSchema);
}

export async function queryProductBySlug(slug: string) {
  const payload = await fetchApiJson<unknown>(`/products/${encodeURIComponent(slug)}`);
  return parseOne(payload, cmsProductSchema);
}

export async function queryIngredients() {
  const payload = await fetchApiJson<unknown>(API_QUERIES.ingredients);
  const candidates = readArray<unknown>(payload, "ingredients");
  return parseArray(candidates, cmsIngredientSchema);
}

export async function queryCertifications() {
  const payload = await fetchApiJson<unknown>(API_QUERIES.certifications);
  const candidates = readArray<unknown>(payload, "certifications");
  return parseArray(candidates, cmsCertificationSchema);
}

export async function queryArticles() {
  const payload = await fetchApiJson<unknown>(API_QUERIES.articles);
  const candidates = readArray<unknown>(payload, "articles");
  return parseArray(candidates, cmsArticleSchema);
}

export async function queryArticleBySlug(slug: string) {
  const payload = await fetchApiJson<unknown>(`/articles/${encodeURIComponent(slug)}`);
  return parseOne(payload, cmsArticleSchema);
}

export async function querySocialPosts() {
  const payload = await fetchApiJson<unknown>(API_QUERIES.socialPosts);
  const candidates = readArray<unknown>(payload, "socialPosts");
  return parseArray(candidates, cmsSocialPostSchema);
}

export async function querySocialMeta(): Promise<CmsSocialMeta | null> {
  const payload = await fetchApiJson<unknown | null>(API_QUERIES.socialMeta);
  if (!payload) return null;
  const candidate = isRecord(payload) && "social" in payload ? payload.social : payload;
  const parsed = cmsSocialMetaSchema.safeParse(deepParseJsonStrings(candidate));
  return parsed.success ? (parsed.data as CmsSocialMeta) : null;
}

export type FormatsCatalogStatus = {
  enabled: boolean;
  id?: string;
};

/** Parse GET /formats-catalog/status. Returns null when the payload is invalid. */
export function parseFormatsCatalogStatus(raw: unknown): FormatsCatalogStatus | null {
  const parsed = parseOne(raw, cmsFormatsCatalogStatusSchema);
  if (!parsed) return null;
  return { enabled: parsed.enabled, id: parsed.id };
}

/**
 * Public status for the "Bảng kích thước" card.
 * Returns null when the endpoint is missing/unavailable so callers can fall back
 * to the catalog payload's own `enabled` flag.
 */
export async function queryFormatsCatalogStatus(): Promise<FormatsCatalogStatus | null> {
  try {
    const payload = await fetchApiJson<unknown>(API_QUERIES.formatsCatalogStatus);
    return parseFormatsCatalogStatus(payload);
  } catch (error) {
    if (error instanceof ApiError && (error.status === 404 || error.status === 501)) {
      return null;
    }
    throw error;
  }
}

/** Parse the formats catalog promo card payload. Returns null when empty/disabled. */
export function parseFormatsCatalog(raw: unknown): FormatsCatalog | null {
  if (!raw) return null;

  let candidate: unknown =
    isRecord(raw) && "formatsCatalog" in raw ? raw.formatsCatalog : raw;

  // BE may return a list; prefer the first enabled row, else the first row.
  if (Array.isArray(candidate)) {
    if (candidate.length === 0) return null;
    const enabledRow = candidate.find((item) => {
      const parsed = parseOne(item, cmsFormatsCatalogSchema);
      return parsed?.enabled;
    });
    candidate = enabledRow ?? candidate[0];
  }

  if (!candidate || (isRecord(candidate) && Object.keys(candidate).length === 0)) {
    return null;
  }

  const parsed = parseOne(candidate, cmsFormatsCatalogSchema);
  if (!parsed || !parsed.enabled) return null;
  return mapFormatsCatalog(parsed);
}

/**
 * Fetch the formats catalog promo card.
 * Uses GET /formats-catalog/status as the source of truth for show/hide when available.
 */
export async function queryFormatsCatalog(): Promise<FormatsCatalog | null> {
  const status = await queryFormatsCatalogStatus();
  if (status && !status.enabled) return null;

  try {
    const payload = await fetchApiJson<unknown | null>(API_QUERIES.formatsCatalog);
    return parseFormatsCatalog(payload);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}
