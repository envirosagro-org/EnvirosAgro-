
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'screens/dashboard_screen.dart'; // <-- UPDATED
import 'sign_in_screen.dart';

class AuthGate extends StatelessWidget {
  const AuthGate({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<User?>(
      stream: FirebaseAuth.instance.authStateChanges(),
      builder: (context, snapshot) {
        // User is signed in
        if (snapshot.hasData) {
          final user = snapshot.data!;
          // Navigate to the new, refactored dashboard
          return DashboardScreen(userId: user.uid);
        }
        // User is not signed in
        return SignInScreen();
      },
    );
  }
}
