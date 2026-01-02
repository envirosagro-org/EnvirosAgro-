
import clientPromise from "../../lib/mongodb";
import type { MongoUser } from "../../types";

// This is the shape of the data the function expects in the request body.
interface SustainabilityArgs {
    S: number;
    Dn: number;
    In: number;
    x: number;
    r?: number;
    n?: number;
    auth_id: string;
}

export const onRequestPost = async ({ request }: { request: Request }) => {
    try {
        const client = await clientPromise;
        const db = client.db("EnvirosAgroDB");
        const usersCollection = db.collection<MongoUser>("users");

        const { S, Dn, In, x, r = 1.0, n = 1, auth_id }: SustainabilityArgs = await request.json();

        // Basic validation
        if (!S || !Dn || !In || !x || !auth_id) {
            return new Response(JSON.stringify({ error: "Missing required parameters: S, Dn, In, x, auth_id" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
        
        // The Math (EnvirosAgro Framework)
        let Ca = 0;
        if (r === 1) {
            Ca = (n * x) + 1;
        } else {
            Ca = (x * (Math.pow(r, n) - 1) / (r - 1)) + 1;
        }
        
        const m = Math.sqrt((Dn * In * Ca) / S);

        // Update MongoDB Document
        const result = await usersCollection.updateOne(
            { auth_id: auth_id },
            { 
                $set: { 
                    "sustainability.Ca": Ca,
                    "sustainability.m": m,
                    "sustainability.last_calibrated": new Date()
                }
            },
            { upsert: true }
        );

        if (result.matchedCount === 0 && result.upsertedCount === 0) {
             return new Response(JSON.stringify({ error: "Could not find user and failed to create a new one." }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ Ca, m, status: "Calibrated" }), {
            headers: { "Content-Type": "application/json" },
        });

    } catch (e) {
        console.error(e);
        let errorMessage = "Failed to calculate sustainability.";
        if (e instanceof Error) {
            errorMessage = e.message;
        }
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};
