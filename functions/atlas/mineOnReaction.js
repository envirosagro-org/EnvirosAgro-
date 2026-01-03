exports = async function(changeEvent) {
  // ===================================================================================
  //  EnvirosAgro - Proof-of-Sustainability Mining Engine v2.0
  //  Description: This serverless function is the core of the EnvirosAgro tokenomics
  //               system. It is triggered when a user posts a reaction to a piece
  //               of content in the 'reactions' collection. The engine calculates a
  //               "Proof-of-Sustainability" reward based on the user's personal
  //               sustainability score (their 'm-score') and the type of reaction.
  //
  //  Trigger: This function is configured to run on a 'CREATE' event on the
  //           'reactions' collection in the 'EnvirosAgroDB' database.
  //
  //  Transactions: To ensure data integrity, all database operations are wrapped
  //                in a MongoDB ACID transaction.
  // ===================================================================================

  const mongodb = context.services.get("mongodb-atlas");
  const db = mongodb.db("EnvirosAgroDB");
  const session = mongodb.startSession();

  // Extract relevant data from the change event
  const { fullDocument } = changeEvent;
  const { userId, contentId, reactionType, sentiment } = fullDocument;

  const transactionOptions = {
    readConcern: { level: 'snapshot' },
    writeConcern: { w: 'majority' }
  };

  try {
    let finalMintAmount = 0;

    await session.withTransaction(async () => {

      // --------------------------------------------------------------------------
      //  1. Fetch User's "Sustainability Power" (Mining Power)
      //     This is derived from their personal 'm' score using a square root
      //     function to create a non-linear reward curve.
      // --------------------------------------------------------------------------
      const user = await db.collection("users").findOne({ _id: userId }, { session });
      if (!user || !user.sustainability_profile) {
        throw new Error(`User or sustainability profile not found for user_id: ${userId}`);
      }
      const miningPower = Math.sqrt(user.sustainability_profile.m || 1);

      // --------------------------------------------------------------------------
      //  2. Define Base Reward by Reaction Effort
      //     More demanding actions (e.g., uploading evidence) are rewarded more.
      // --------------------------------------------------------------------------
      let baseReward = 0;
      if (reactionType === "SIMPLE_VOTE") baseReward = 2;       // 2 EAC
      if (reactionType === "DETAILED_REVIEW") baseReward = 10;  // 10 EAC
      if (reactionType === "EVIDENCE_UPLOAD") baseReward = 50;  // 50 EAC

      // --------------------------------------------------------------------------
      //  3. Check for "Five Thrusts" Bonus
      //     A 2x multiplier is applied if the user has interacted with all five
      //     sustainability thrusts recently, encouraging diverse engagement.
      // --------------------------------------------------------------------------
      let multiplier = 1.0;
      // Note: `has_all_five` is a boolean that would be calculated and stored
      // on the user's profile by a separate, scheduled function.
      if (user.thrust_activity && user.thrust_activity.has_all_five) {
          multiplier = 2.0;
      }

      // --------------------------------------------------------------------------
      //  4. Calculate Final Mint Amount
      // --------------------------------------------------------------------------
      finalMintAmount = baseReward * miningPower * multiplier;

      if (finalMintAmount <= 0) {
        console.log("No reward to mint. Aborting transaction.");
        return; // No need to proceed if there's no reward
      }
      
      // --------------------------------------------------------------------------
      //  5. Execute Transaction: Mint EAC & Record in Ledger
      // --------------------------------------------------------------------------
      // A. Add the minted amount to the user's wallet
      await db.collection("users").updateOne(
        { _id: userId },
        { $inc: { "wallet.balance": finalMintAmount, "wallet.lifetime": finalMintAmount } },
        { session }
      );

      // B. Record the transaction in the ledger for transparency and auditing
      await db.collection("ledger").insertOne({
        userId: userId,
        amount: finalMintAmount,
        type: "MINT",
        reason: `Proof-of-Sustainability: ${reactionType}`,
        contentId: contentId,
        timestamp: new Date()
      }, { session });

      // --------------------------------------------------------------------------
      //  6. Update Content Quality Score (The Feedback Loop)
      //     The user's mining power influences the content's score. Positive
      //     reactions increase it; negative reactions decrease it.
      // --------------------------------------------------------------------------
      const qualityImpact = (sentiment === "POSITIVE" ? 1 : -1) * miningPower;
      await db.collection("registry").updateOne(
        { _id: contentId },
        { $inc: { qualityScore: qualityImpact } },
        { session }
      );

    }, transactionOptions);

    console.log(`Successfully minted ${finalMintAmount} EAC for user ${userId}`);
    return { status: "SUCCESS", minted: finalMintAmount };

  } catch (e) {
    console.error("Mining transaction failed:", e.message);
    // The transaction will be automatically aborted by `withTransaction`
    return { status: "FAILED", error: e.message };
  } finally {
    // End the session, releasing the connection back to the pool.
    await session.endSession();
  }
};
