import { fetchCmsJson } from "./client";
import { z } from "zod";
import {
  cmsArticleSchema,
  cmsCertificationSchema,
  cmsHomepageSchema,
  cmsIngredientSchema,
  cmsProductSchema,
  cmsSlideSchema,
  cmsSocialMetaSchema,
  cmsSocialPostSchema,
} from "./schemas";
import type {
  CmsHomepageResponse,
  CmsSocialMeta,
} from "./types";

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

function readArray<T>(payload: unknown, key: string): T[] {
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
    const parsed = schema.safeParse(item);
    if (parsed.success) output.push(parsed.data);
  }
  return output;
}

export const CMS_QUERIES = {
  // Strapi v5-style REST contract (customized content type naming can map here).
  homepage:
    "/api/homepage?populate[slides][populate]=image&populate[products][populate]=frontImage,backImage,galleryImages&populate[ingredients][populate]=image&populate[certifications]=*&populate[articles][populate]=thumbnail&populate[socialPosts][populate]=image&populate[social]=*",
  products:
    "/api/products?populate=frontImage,backImage,galleryImages&sort=name:asc",
} as const;

export async function queryHomepagePayload() {
  const raw = await fetchCmsJson<unknown>(CMS_QUERIES.homepage);
  if (!raw) return null;
  const parsed = cmsHomepageSchema.safeParse(raw);
  return parsed.success ? (parsed.data as CmsHomepageResponse) : null;
}

export async function querySlides() {
  const payload = await queryHomepagePayload();
  return parseArray(payload?.slides, cmsSlideSchema);
}

export async function queryProducts() {
  const payload = await fetchCmsJson<unknown>(CMS_QUERIES.products);
  const candidates = readArray<unknown>(payload, "products");
  return parseArray(candidates, cmsProductSchema);
}

export async function queryIngredients() {
  const payload = await queryHomepagePayload();
  return parseArray(payload?.ingredients, cmsIngredientSchema);
}

export async function queryCertifications() {
  const payload = await queryHomepagePayload();
  return parseArray(payload?.certifications, cmsCertificationSchema);
}

export async function queryArticles() {
  const payload = await queryHomepagePayload();
  return parseArray(payload?.articles, cmsArticleSchema);
}

export async function querySocialPosts() {
  const payload = await queryHomepagePayload();
  return parseArray(payload?.socialPosts, cmsSocialPostSchema);
}

export async function querySocialMeta() {
  const payload = await queryHomepagePayload();
  if (!payload?.social) return null;
  const parsed = cmsSocialMetaSchema.safeParse(payload.social);
  return parsed.success ? (parsed.data as CmsSocialMeta) : null;
}
