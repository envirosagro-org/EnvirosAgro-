import 'package:realm/realm.dart';

class AtlasService {
  // Connect to your Atlas App ID
  final App app = App(AppConfiguration("envirosagro-app-id-xxxxx"));

  // 1. Authenticate
  Future<User> login() async {
    return await app.logIn(Credentials.anonymous()); // Or EmailPassword
  }

  // 2. Call the Sustainability Function
  Future<Map<String, dynamic>> calibrateSustainability(double S, double Dn, double In, double x) async {
    final user = app.currentUser!;
    
    // Call the Atlas Function defined in Part 2
    final result = await user.functions.call("calculateSustainability", [{
      'S': S, 'Dn': Dn, 'In': In, 'x': x
    }]);
    
    return Map<String, dynamic>.from(result);
  }

  // 3. Call the Mining Function
  Future<void> mineReaction(String contentId, String type) async {
    final user = app.currentUser!;
    await user.functions.call("mineOnReaction", [{
      'contentId': contentId, 'reactionType': type
    }]);
  }
}
