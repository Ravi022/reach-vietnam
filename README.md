# Reach Vietnam Company Limited

## Local development
Use Node.js 24 and pnpm 11.25.0. From the extracted directory:

    pnpm install --frozen-lockfile
    pnpm dev

Open the local URL printed by the development server. To create a production build, run `pnpm build`. This project uses React and Next.js App Router conventions with the Vinext runtime and Cloudflare Worker build. The catalogue and photos are included; no database is required for browsing.

## Website structure
- `app/page.tsx`: corporate homepage
- `app/products/page.tsx`: category directory and product index
- `app/products/[slug]`: division pages and nested product specifications
- `lib/portfolio.ts`: category membership and canonical URLs
- `lib/products.ts`: catalogue specifications
- `public/images`: bundled photographs and brand assets

The contact page prepares a downloadable enquiry for the buyer to share with their sales contact.

