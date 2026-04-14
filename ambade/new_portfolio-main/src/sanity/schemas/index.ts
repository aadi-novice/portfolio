import { defineType, defineField } from 'sanity';

// ─── Portable Text Custom Blocks ───────────────────────────────────────────

const codeBlock = defineType({
  name: 'codeBlock',
  title: 'Code Block',
  type: 'object',
  fields: [
    defineField({ name: 'filename', title: 'Filename (optional)', type: 'string' }),
    defineField({ name: 'language', title: 'Language', type: 'string', initialValue: 'typescript' }),
    defineField({ name: 'code', title: 'Code', type: 'text' }),
  ],
  preview: { select: { title: 'filename', subtitle: 'language' } },
});

const imageBlock = defineType({
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  fields: [
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({ name: 'altText', title: 'Alt Text', type: 'string' }),
    defineField({ name: 'label', title: 'Label (e.g. UI_PROTOTYPE_01)', type: 'string' }),
  ],
  preview: { select: { title: 'caption', media: 'image' } },
});

const metricsBlock = defineType({
  name: 'metricsBlock',
  title: 'Impact Metrics',
  type: 'object',
  fields: [
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value (e.g. -84%)', type: 'string' }),
            defineField({ name: 'label', title: 'Label (e.g. QUERY_LATENCY)', type: 'string' }),
            defineField({
              name: 'color',
              title: 'Card Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Neon (Primary)', value: 'primary' },
                  { title: 'Accent (Secondary)', value: 'secondary' },
                ],
              },
              initialValue: 'primary',
            }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
    }),
  ],
});

const challengeBlock = defineType({
  name: 'challengeBlock',
  title: 'Challenge Card',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title (e.g. LATENCY_BOTTLENECK)', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({
      name: 'theme',
      title: 'Card Theme',
      type: 'string',
      options: { list: [{ title: 'Dark (Neon)', value: 'dark' }, { title: 'Light (White)', value: 'light' }] },
      initialValue: 'dark',
    }),
  ],
  preview: { select: { title: 'title' } },
});

const calloutBlock = defineType({
  name: 'calloutBlock',
  title: 'Quote / Callout',
  type: 'object',
  fields: [
    defineField({ name: 'quote', title: 'Quote Text', type: 'text' }),
    defineField({ name: 'attribution', title: 'Attribution (e.g. — Lead Architect)', type: 'string' }),
  ],
  preview: { select: { title: 'quote' } },
});

const techSpecBlock = defineType({
  name: 'techSpecBlock',
  title: 'Tech Specs Table',
  type: 'object',
  fields: [
    defineField({
      name: 'specs',
      title: 'Specs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label (e.g. Language)', type: 'string' }),
            defineField({ name: 'value', title: 'Value (e.g. PYTHON_3.12)', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
    }),
  ],
});

// ─── Shared Portable Text definition ───────────────────────────────────────

const richContent = {
  type: 'array',
  of: [
    {
      type: 'block',
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
      },
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],
    },
    { type: 'codeBlock' },
    { type: 'imageBlock' },
    { type: 'metricsBlock' },
    { type: 'challengeBlock' },
    { type: 'calloutBlock' },
    { type: 'techSpecBlock' },
  ],
};

// ─── Project Schema ─────────────────────────────────────────────────────────

const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (R) => R.required() }),
    defineField({ name: 'description', title: 'Description (Hero subtitle)', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'imageUrl', title: 'Or Hero Image URL (external)', type: 'url' }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({ name: 'githubUrl', title: 'GitHub URL', type: 'url' }),
    defineField({ name: 'demoUrl', title: 'Live Demo URL', type: 'url' }),
    defineField({
      name: 'body',
      title: 'Project Content (Blocks)',
      ...richContent,
    }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
  ],
  preview: {
    select: { title: 'title', media: 'image', subtitle: 'description' },
  },
  orderings: [{ title: 'Newest First', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
});

// ─── Blog Post Schema ────────────────────────────────────────────────────────

const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (R) => R.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt (short summary)', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'imageUrl', title: 'Or Cover Image URL (external)', type: 'url' }),
    defineField({ name: 'author', title: 'Author', type: 'string', initialValue: 'Aditya Ambade' }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({
      name: 'body',
      title: 'Article Content (Blocks)',
      ...richContent,
    }),
  ],
  preview: {
    select: { title: 'title', media: 'image', subtitle: 'excerpt' },
  },
  orderings: [{ title: 'Newest First', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
});

export const schemaTypes = [
  project,
  post,
  codeBlock,
  imageBlock,
  metricsBlock,
  challengeBlock,
  calloutBlock,
  techSpecBlock,
];
