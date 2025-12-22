import clientPromise from "../../lib/mongodb";

export const onRequestGet = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("envirosagro");
    
    // Example: fetch some data
    const movies = await db
      .collection("test")
      .find({})
      .limit(10)
      .toArray();

    return new Response(JSON.stringify(movies), {
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
