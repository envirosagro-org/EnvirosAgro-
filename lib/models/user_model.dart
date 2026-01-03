
import 'package:cloud_firestore/cloud_firestore.dart';

class EnvirosUser {
  final String uid;
  final String displayName;
  final String email;
  final int walletBalance;
  final int lifetimeScore;
  final Map<String, dynamic> skills;

  EnvirosUser({
    required this.uid,
    required this.displayName,
    required this.email,
    required this.walletBalance,
    required this.lifetimeScore,
    required this.skills,
  });

  // Factory to create User object from Firebase Data
  factory EnvirosUser.fromFirestore(DocumentSnapshot doc) {
    Map data = doc.data() as Map<String, dynamic>;
    
    return EnvirosUser(
      uid: doc.id,
      displayName: data['displayName'] ?? 'User',
      email: data['email'] ?? '',
      // Safely accessing nested Wallet data
      walletBalance: data['wallet']?['balance'] ?? 0,
      lifetimeScore: data['wallet']?['lifetime_earned'] ?? 0,
      // Safely accessing nested Skill data
      skills: data['worker_profile']?['skills'] ?? {},
    );
  }

  // Helper to get User Rank
  String get rank {
    if (lifetimeScore > 2000) return "Harvest Tier (Expert)";
    if (lifetimeScore > 500) return "Sprout Tier (Skilled)";
    return "Seed Tier (New)";
  }
}
