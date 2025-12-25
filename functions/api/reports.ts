import clientPromise from "../../lib/mongodb";

export const onRequestGet = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("envirosagro");
    
    const reports = await db
      .collection("reports")
      .find({})
      .sort({ date: -1 })
      .toArray();

    return new Response(JSON.stringify(reports), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Failed to connect to database" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const onRequestPost = async (context: { request: Request }) => {
  try {
    const data = await context.request.json();
    const client = await clientPromise;
    const db = client.db("envirosagro");
    
    const result = await db.collection("reports").insertOne({
      ...data,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Failed to create report" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
