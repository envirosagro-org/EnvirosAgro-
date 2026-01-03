
import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = getFirestore();

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

        // Update Firestore Document
        const userRef = db.collection("users").doc(auth_id);
        await userRef.set({
            sustainability: {
                Ca: Ca,
                m: m,
                last_calibrated: new Date()
            }
        }, { merge: true });

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
