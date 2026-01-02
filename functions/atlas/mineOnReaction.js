exports = async function(arg) {
  const mongodb = context.services.get("mongodb-atlas");
  const db = mongodb.db("EnvirosAgroDB");
  const session = mongodb.startSession(); // ACID Transaction

  const userId = context.user.id;
  const { contentId, reactionType } = arg;

  try {
    const transactionOptions = { readConcern: { level: 'snapshot' }, writeConcern: { w: 'majority' } };
    
    await session.withTransaction(async () => {
      // A. Fetch User's Mining Power
      const user = await db.collection("users").findOne({ auth_id: userId }, { session });
      const userM = user.sustainability ? user.sustainability.m : 1.0;
      const miningPower = Math.sqrt(userM);

      // B. Determine Reward
      const rates = { "VOTE": 2.0, "VERIFY": 5.0, "UPLOAD": 50.0 };
      const baseReward = rates[reactionType] || 1.0;
      
      // Thrust Multiplier Check
      const thrusts = user.thrust_history || [];
      const multiplier = thrusts.length >= 5 ? 2.0 : 1.0;
      
      const finalReward = baseReward * miningPower * multiplier;

      // C. Mint Coins (Update Wallet)
      await db.collection("users").updateOne(
        { auth_id: userId },
        { $inc: { "wallet.balance": finalReward, "wallet.lifetime": finalReward } },
        { session }
      );

      // D. Record Ledger
      await db.collection("ledger").insertOne({
        uid: userId,
        amount: finalReward,
        reason: `Mining: ${reactionType}`,
        timestamp: new Date()
      }, { session });

      // E. Update Content Quality (Feedback Loop)
      await db.collection("registry").updateOne(
        { _id: BSON.ObjectId(contentId) },
        { $inc: { quality_score: miningPower } }, // High 'm' users boost content more
        { session }
      );

    }, transactionOptions);
    
    return { status: "Mined", amount: "Calculated based on m-score" };

  } catch (e) {
    return { error: e.message };
  } finally {
    session.endSession();
  }
};
