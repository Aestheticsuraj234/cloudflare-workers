import { Client } from "pg";

export default {
  async fetch(request, env, ctx): Promise<Response> {
    
    const sql = new Client({
      connectionString: env.HYPERDRIVE.connectionString,
    });
      
        await sql.connect();

		const url = new URL(request.url);

		if(request.method==="POST" && url.pathname === "/products"){
			  // Parse the request's JSON payload
            const productData = (await request.json()) as {
                name: string;
                description: string;
                price: number;
            };
			const name = productData.name,
                description = productData.description,
                price = productData.price;

            // Insert the new product into the products table
            const insertResult = await sql.query(
                `INSERT INTO product(name, description, price) VALUES($1, $2, $3)
    RETURNING *`,
                [name, description, price],
            );

            // Return the inserted row as JSON
            return new Response(JSON.stringify(insertResult.rows), {
                headers: { "Content-Type": "application/json" },
            });
		}
        
        const result = await sql.query("SELECT * FROM products");

       
        return new Response(JSON.stringify(result.rows), {
            headers: {
                "Content-Type": "application/json",
            },
        });
  },
} satisfies ExportedHandler<Env>;