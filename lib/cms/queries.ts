import { z } from "zod";
import { ApiError } from "@/lib/api/errors";
import { deepParseJsonStrings } from "@/lib/api/normalize";
import { fetchApiJson } from "./client";
import { mapFormatsCatalog } from "./mappers";
import {
  cmsArticleSchema,
  cmsCertificationSchema,
  cmsFormatsCatalogSchema,
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

/** Parse the formats catalog promo card payload. Returns null when empty/disabled. */
export function parseFormatsCatalog(raw: unknown): FormatsCatalog | null {
  if (!raw) return null;
  const candidate =
    isRecord(raw) && "formatsCatalog" in raw ? raw.formatsCatalog : raw;
  if (!candidate || (isRecord(candidate) && Object.keys(candidate).length === 0)) {
    return null;
  }
  const parsed = parseOne(candidate, cmsFormatsCatalogSchema);
  return parsed ? mapFormatsCatalog(parsed) : null;
}

export async function queryFormatsCatalog(): Promise<FormatsCatalog | null> {
  try {
    const payload = await fetchApiJson<unknown | null>(API_QUERIES.formatsCatalog);
    return parseFormatsCatalog(payload);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}
