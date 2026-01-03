
import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/user_model.dart'; // Assuming your EnvirosUser model is here

class FirestoreService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  // Stream a user's profile from Firestore
  Stream<EnvirosUser> streamUser(String uid) {
    if (uid.isEmpty) {
      return Stream.empty();
    }
    final docRef = _db.collection('users').doc(uid);
    return docRef.snapshots().map((doc) => EnvirosUser.fromFirestore(doc));
  }

  // Get a single user profile snapshot (for one-time reads)
  Future<EnvirosUser> getUser(String uid) async {
    if (uid.isEmpty) {
      throw Exception("User ID cannot be empty");
    }
    final docRef = _db.collection('users').doc(uid);
    final doc = await docRef.get();
    if (doc.exists) {
      return EnvirosUser.fromFirestore(doc);
    } else {
      throw Exception("User not found!");
    }
  }
}
