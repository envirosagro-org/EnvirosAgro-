exports = async function(arg) {
  // 1. Get Services
  const mongodb = context.services.get("mongodb-atlas");
  const usersCollection = mongodb.db("EnvirosAgroDB").collection("users");
  const callerId = context.user.id; // The logged-in user

  // 2. Parse Inputs (from the Flutter App)
  const { S, Dn, In, x, r = 1.0, n = 1 } = arg;

  // 3. The Math (EnvirosAgro Framework)
  let Ca = 0;
  if (r === 1) {
    Ca = (n * x) + 1;
  } else {
    Ca = (x * (Math.pow(r, n) - 1) / (r - 1)) + 1;
  }
  
  // m = SQRT((Dn * In * Ca) / S)
  const m = Math.sqrt((Dn * In * Ca) / S);

  // 4. Update MongoDB Document
  await usersCollection.updateOne(
    { auth_id: callerId },
    { 
      $set: { 
        "sustainability.Ca": Ca,
        "sustainability.m": m,
        "sustainability.last_calibrated": new Date()
      }
    },
    { upsert: true }
  );

  return { Ca, m, status: "Calibrated" };
};
