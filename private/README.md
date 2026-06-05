# Private ebook files — DO NOT move into /public

Put the ebook source files here, named to match `src/lib/ebook.ts`:

- `the-age-of-accountability.pdf`
- `the-age-of-accountability.epub`

## Why this folder

Files here are **never** served as static assets (only `/public` is). The only way
to get them is through `/api/download`, which first verifies a signed token **and**
re-checks with Stripe that the order was paid.

## Important

- These files ARE committed to git so Vercel includes them in the deployment.
  That is safe **only because this GitHub repo is private.** Keep it private.
- `next.config.ts` (`outputFileTracingIncludes`) bundles this folder into the
  download function — don't remove that.
- If you ever make the repo public, move these files to private object storage
  (e.g. Vercel Blob / S3 / R2) and read them from there instead.
