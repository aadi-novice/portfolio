import { urlFor } from './sanityClient';

/** Slug for a Sanity document or a local fallback entry. */
export function slugOf(item: any): string {
  return item?.slug?.current || item?.slug || item?._id || item?.id?.toString() || '';
}

/** Image URL for a Sanity image, an imageUrl field, or a fallback string. */
export function imageOf(item: any, width = 1200): string {
  if (item?.image?.asset) return urlFor(item.image).width(width).url();
  return item?.imageUrl || (typeof item?.image === 'string' ? item.image : '') || '';
}

/** "April 2026" from publishedAt, or the fallback entry's own date string. */
export function monthYear(item: any): string {
  if (item?.publishedAt) {
    return new Date(item.publishedAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  }
  return item?.date || '';
}

/** "14 April 2026" from publishedAt, or the fallback entry's own date string. */
export function fullDate(item: any): string {
  if (item?.publishedAt) {
    return new Date(item.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  return item?.date || '';
}

/** Four-digit year, when the entry has a date. */
export function yearOf(item: any): string {
  const source = item?.publishedAt || item?.date;
  if (!source) return '';
  const d = new Date(source);
  return Number.isNaN(d.getTime()) ? '' : String(d.getFullYear());
}

/** Letters and digits only, lower case: "Kineti-AI" and "KinetiAI —" compare equal. */
function letters(text: string): string {
  return (text || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

/** Plain text of a Portable Text block. */
export function blockText(block: any): string {
  return (block?.children || []).map((c: any) => c.text || '').join('');
}

/** True when a body opens by repeating the document title as a heading. */
export function echoesTitle(block: any, title: string): boolean {
  if (!block || block._type !== 'block' || !/^h[1-3]$/.test(block.style || '')) return false;
  const a = letters(blockText(block));
  const b = letters(title);
  return !!a && !!b && (a.startsWith(b) || b.startsWith(a));
}

/** The first plain paragraph of a body, skipping a heading that repeats the title. */
export function openingLine(body: any[] | undefined, title: string): string {
  const first = (body || []).find((b, i) => b?._type === 'block' && (b.style || 'normal') === 'normal' && !b.listItem && !(i === 0 && echoesTitle(b, title)));
  return first ? blockText(first) : '';
}
