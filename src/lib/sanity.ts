import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

export const queries = {
  allPosts: `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    estimatedReadingTime,
    "mainImage": mainImage{asset->{url}, alt},
    "author": author->{name, "image": image{asset->{url}}},
    "categories": categories[]->{title}
  }`,

  postBySlug: `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    estimatedReadingTime,
    "mainImage": mainImage{asset->{url}, alt},
    "author": author->{name, "image": image{asset->{url}}},
    "categories": categories[]->{title}
  }`,

  recentPosts: `*[_type == "post"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    estimatedReadingTime,
    "mainImage": mainImage{asset->{url}, alt},
    "categories": categories[]->{title}
  }`,
};

export async function getAllPosts() {
  try {
    return await sanityClient.fetch(queries.allPosts);
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    return await sanityClient.fetch(queries.postBySlug, { slug });
  } catch {
    return null;
  }
}

export async function getRecentPosts() {
  try {
    return await sanityClient.fetch(queries.recentPosts);
  } catch {
    return [];
  }
}
