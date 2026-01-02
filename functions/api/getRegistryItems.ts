
import clientPromise from "../../lib/mongodb";
import type { Registry } from "../../types";

export const onRequestGet = async () => {
    try {
        const client = await clientPromise;
        const db = client.db("EnvirosAgroDB");
        const registryCollection = db.collection<Registry>("registry");

        // You can add pagination, sorting, or filtering here if needed
        const items = await registryCollection.find({}).limit(20).toArray();

        return new Response(JSON.stringify(items), {
            headers: { "Content-Type": "application/json" },
        });

    } catch (e) {
        console.error(e);
        let errorMessage = "Failed to fetch registry items.";
        if (e instanceof Error) {
            errorMessage = e.message;
        }
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};
