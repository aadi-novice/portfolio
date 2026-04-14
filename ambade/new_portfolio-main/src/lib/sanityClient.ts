import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'YOUR_PROJECT_ID',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-04-14',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// ─── GROQ Queries ────────────────────────────────────────────────────────────

export const projectsQuery = `*[_type == "project"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  description,
  image,
  imageUrl,
  tags,
  publishedAt
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  image,
  imageUrl,
  tags,
  githubUrl,
  demoUrl,
  publishedAt,
  body[] {
    ...,
    _type == "imageBlock" => {
      ...,
      image { ..., asset-> }
    }
  }
}`;

export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  image,
  imageUrl,
  author,
  publishedAt,
  tags
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  image,
  imageUrl,
  author,
  publishedAt,
  tags,
  body[] {
    ...,
    _type == "imageBlock" => {
      ...,
      image { ..., asset-> }
    }
  }
}`;
