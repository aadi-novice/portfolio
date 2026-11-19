// Projects and journal posts kept in code, newest first, shown ahead of the
// Sanity entries. Each one also has a matching draft in sanity-drafts/ for import.
import { totem } from './totem';
import { nyayasearch, nyayaPosts } from './nyayasearch';

export const localProjects: any[] = [nyayasearch, totem];
export const localPosts: any[] = [...nyayaPosts];

const slug = (item: any) => item?.slug?.current || item?.slug || '';
export const findLocalProject = (s: string) => localProjects.find((p) => slug(p) === s);
export const findLocalPost = (s: string) => localPosts.find((p) => slug(p) === s);
