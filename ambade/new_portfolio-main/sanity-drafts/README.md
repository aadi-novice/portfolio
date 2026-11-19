# Sanity drafts: Totem

`totem.ndjson` holds two documents, one per line:

- `drafts.project-totem` (`project`): the Totem project page, with title, slug `totem`, description, tags, demo link (https://gettotem.app) and a body built only from copy on gettotem.app.
- `drafts.post-totem-early-access` (`post`): a short "Totem is in early access" announcement. The copy is a placeholder: rewrite it in your own voice and delete the DRAFT line at the top of the body before publishing.

Both are drafts (`drafts.` IDs). Nothing goes live until you press Publish in Studio. Neither has `publishedAt`, so set it when you publish.

## Import

From the project root:

    npx sanity login
    npx sanity dataset import sanity-drafts/totem.ndjson production

To re-run after editing the file, add `--replace`. This repo has no `sanity.cli.ts`, so if the CLI asks for a project, add `--project-id <your project id>`.

## Image

`imageUrl` is a placeholder: `https://ambade.me/images/totem/totem-desktop.jpg`, which is `/images/totem/totem-desktop.jpg` from `public/` on the deployed site. Deploy the site first so that URL resolves, or upload an image to the Image field in Studio instead.

**Before publishing:** review the post copy, check both bodies, then publish each document in Studio.

## nyayasearch.ndjson
Nyaya Search project and two journal posts, as drafts. Import the same way: `npx sanity dataset import sanity-drafts/nyayasearch.ndjson production`. In-body images use an `imageUrl` field; if the imageBlock schema only takes an uploaded image, re-add those three charts in Studio.
