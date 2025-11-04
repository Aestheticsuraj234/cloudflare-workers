
- **Purpose & Overview**
  - This tutorial teaches you to create a Cloudflare Workers application that connects to a PostgreSQL database using TCP Sockets and optionally Hyperdrive (to speed up queries).
  - You’ll set up a Worker to interact (read and write) with a sample products table in PostgreSQL.

- **Step-by-Step Guide**
  - **Prerequisites:** You’ll need a Cloudflare account, Node.js (v16.17.0+), npm, and access to a PostgreSQL database.
  - **Create Worker App:** Use `npm create cloudflare@latest -- postgres-tutorial` and select TypeScript, version control via git, plus ideal starter templates.
  - **Node.js Compatibility:** Set compatibility flags in your Wrangler config so your Worker can use Node.js database drivers.
  - **Install pg Library:** Use `npm i pg` and for TypeScript types, `npm i -D @types/pg` (minimum pg v8.16.3).
  - **Database Connection Setup:** Connect via environment secrets for your connection string or explicit parameters. Store sensitive info like passwords using `wrangler secret put`.
  - **Connecting in Worker:** Import and use the `Client` from `pg` inside your Worker’s fetch handler, connecting with your credentials/secrets.
  - **Query/Insert:** Example code is provided for reading all products (`SELECT * FROM products`) and for inserting new products via POST requests (using standard SQL `INSERT INTO`).
  - **Deploy:** Use `npx wrangler deploy` to make your Worker live.
  - **Hyperdrive Acceleration:** You can further speed up database interactions using Hyperdrive via Wrangler setup and binding, then swap your Worker config and code to use it.
  - **Iterate:** Redeploy your Worker after changes.

- **Resources & Next Steps**
  - The page links out to shared Cloudflare documentation for broader tutorials, API, and developer community.
  - Last updated Oct 13, 2025.

**Ideal for developers wanting to run backend/API logic in Cloudflare Workers and integrate PostgreSQL for persistent storage, with modern TypeScript/Node.js workflows and enhanced performance via Hyperdrive.**[1]

[1](https://developers.cloudflare.com/workers/tutorials/postgres/)