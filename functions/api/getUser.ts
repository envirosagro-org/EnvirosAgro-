
import clientPromise from "../../lib/mongodb";
import type { MongoUser } from "../../types";

interface GetUserRequest {
    userId: string;
}

export const onRequestPost = async ({ request }: { request: Request }) => {
    try {
        const client = await clientPromise;
        const db = client.db("EnvirosAgroDB");
        const usersCollection = db.collection<MongoUser>("users");

        const { userId }: GetUserRequest = await request.json();

        if (!userId) {
            return new Response(JSON.stringify({ error: "Missing required parameter: userId" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const user = await usersCollection.findOne({ auth_id: userId });

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify(user), {
            headers: { "Content-Type": "application/json" },
        });

    } catch (e) {
        console.error(e);
        let errorMessage = "Failed to get user data.";
        if (e instanceof Error) {
            errorMessage = e.message;
        }
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};
