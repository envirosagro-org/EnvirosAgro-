
import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
import type { MongoUser, Ledger, Registry } from "../../types";

interface MineOnReactionArgs {
    contentId: string;
    reactionType: "VOTE" | "VERIFY" | "UPLOAD";
    userId: string; // This should be the auth_id of the user
}

export const onRequestPost = async ({ request }: { request: Request }) => {
    const client = await clientPromise;
    const db = client.db("EnvirosAgroDB");
    const session = client.startSession();

    try {
        const { contentId, reactionType, userId }: MineOnReactionArgs = await request.json();

        if (!contentId || !reactionType || !userId) {
            return new Response(JSON.stringify({ error: "Missing required parameters: contentId, reactionType, userId" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
        
        let finalReward = 0;

        const transactionOptions = {
            readConcern: { level: 'snapshot' as const },
            writeConcern: { w: 'majority' as const }
        };

        await session.withTransaction(async () => {
            const usersCollection = db.collection<MongoUser>("users");
            const ledgerCollection = db.collection<Ledger>("ledger");
            const registryCollection = db.collection<Registry>("registry");

            const user = await usersCollection.findOne({ auth_id: userId }, { session });
            if (!user) {
                throw new Error("User not found.");
            }
            const userM = user.sustainability?.m ?? 1.0;
            const miningPower = Math.sqrt(userM);

            const rates = { "VOTE": 2.0, "VERIFY": 5.0, "UPLOAD": 50.0 };
            const baseReward = rates[reactionType] || 1.0;

            const thrusts = user.thrust_history || [];
            const multiplier = thrusts.length >= 5 ? 2.0 : 1.0;

            finalReward = baseReward * miningPower * multiplier;

            await usersCollection.updateOne(
                { auth_id: userId },
                { $inc: { "wallet.balance": finalReward, "wallet.lifetime": finalReward } },
                { session }
            );

            await ledgerCollection.insertOne({
                uid: userId,
                amount: finalReward,
                type: `Mining: ${reactionType}`,
                timestamp: new Date().toISOString()
            }, { session });

            await registryCollection.updateOne(
                { _id: new ObjectId(contentId) },
                { $inc: { quality_score: miningPower } },
                { session }
            );

        }, transactionOptions);
        
        return new Response(JSON.stringify({ status: "Mined", amount: finalReward }), {
            headers: { "Content-Type": "application/json" },
        });

    } catch (e) {
        let errorMessage = "Mining operation failed.";
        if (e instanceof Error) {
            errorMessage = e.message;
        }
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    } finally {
        await session.endSession();
    }
};
