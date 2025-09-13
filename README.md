# MovieBox Full Starter (Protected Admin)

This ZIP contains a more complete starter scaffold:
- Supabase schema (supabase/schema.sql)
- Admin protection middleware
- Admin UI placeholders (pages/admin/*)
- API route placeholders for flutterwave/manual/webhook (pages/api/purchases/*)
- lib/ helpers for Supabase & Flutterwave

Next steps:
1. Copy `.env.example` -> `.env.local` and fill keys.
2. Run the SQL in `supabase/schema.sql` in Supabase SQL Editor.
3. `npm install` then `npm run dev`
4. Implement auth session handling for server routes (we used placeholders).

This package is intentionally conservative and safe — real payment & file handling requires server secrets and secure handling which you must finish before production.
