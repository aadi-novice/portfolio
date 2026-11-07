// Totem, the newest app, kept in code until it is added to Sanity
// (sanity-drafts/totem.ndjson holds the same entry for import).
// Every line is quoted from gettotem.app; nothing here is invented.

const block = (key: string, text: string, style = 'normal', listItem?: string) => ({
  _type: 'block',
  _key: key,
  style,
  markDefs: [],
  ...(listItem ? { listItem, level: 1 } : {}),
  children: [{ _type: 'span', _key: `${key}s`, text, marks: [] }],
});

export const totem = {
  _id: 'local-totem',
  title: 'Totem',
  slug: { current: 'totem' },
  description: 'An Android app blocker you switch off by scanning a real object.',
  imageUrl: '/images/totem/totem-desktop.jpg',
  phoneImageUrl: '/images/totem/totem-phone.jpg',
  tags: ['Android', 'Focus timer', 'App blocker'],
  demoUrl: 'https://gettotem.app',
  earlyAccessUrl: 'https://forms.gle/MjCz56Y441uqU42f6',
  date: '2026',
  body: [
    block('t1', 'How it works', 'h3'),
    block('t2', 'Totem is a focus timer and app blocker for Android. You start a focus session by scanning an object on your desk, or a printed QR code, and the apps you chose stay blocked until you scan it again to finish.'),
    block('t3', 'For students, working professionals and late-night scrollers.'),
    block('t4', 'Features', 'h3'),
    block('t5', 'A real object, like a notebook or a pen stand, is the main key.', 'normal', 'bullet'),
    block('t6', 'Every totem also has a QR code as a backup key.', 'normal', 'bullet'),
    block('t7', 'Pomodoro breaks pause blocking, then pick it back up.', 'normal', 'bullet'),
    block('t8', 'Open Instagram mid-session and Pebble is waiting. The message changes with the moment.', 'normal', 'bullet'),
    block('t9', 'Study groups join with an invite code. The leaderboard resets every Monday.', 'normal', 'bullet'),
    block('t10', 'Each session feeds your streak and a weekly recap.', 'normal', 'bullet'),
    block('t11', 'Blocking and focus sessions work without internet.', 'normal', 'bullet'),
    block('t12', 'Emergency Unlock ends any session.', 'normal', 'bullet'),
    block('t13', 'Status', 'h3'),
    block('t14', 'Totem is Android only for now, and in early access before launch.'),
  ],
};

/** Projects from the latest resume that have no page of their own yet. */
export const resumeProjects = [
  {
    title: 'Intervue',
    kind: 'Project',
    line: 'Multi-tenant AI recruitment and interview platform.',
    detail: '120+ REST endpoints on FastAPI, PostgreSQL + pgvector and Celery/Redis, with org-scoped RBAC, API keys and webhooks; ~590 backend tests.',
    href: 'https://github.com/aadi-novice',
  },
  {
    title: 'Medichat',
    kind: 'Project',
    line: 'Medical RAG on FAISS, with under-2s responses.',
    detail: 'Medical RAG on FAISS, with under-2s responses.',
    href: '',
  },
];
