import 'package:realm/realm.dart';

class AtlasService {
  // IMPORTANT: REPLACE WITH YOUR ATLAS APP ID
  static const String _appId = '6957933ebaecce170fa892b1'; 
  final App _app = App(AppConfiguration(_appId));

  User? _currentUser;

  Future<void> login() async {
    if (_currentUser == null) {
      // Using anonymous login for simplicity. 
      // Replace with your desired authentication provider.
      _currentUser = await _app.logIn(Credentials.anonymous());
    }
  }

  // This function would call a serverless function in your Atlas backend.
  Future<Map<String, dynamic>> calibrateSustainability(double-a, double-b, double-c, double-d) async {
    if (_currentUser == null) await login();
    
    final result = await _currentUser!.functions.call('calculateSustainability', [a, b, c, d]);
    return result as Map<String, dynamic>;
  }

  // This function would call another serverless function.
  Future<void> mineReaction(String documentId, String reactionType) async {
    if (_currentUser == null) await login();
    
    await _currentUser!.functions.call('mineOnReaction', [documentId, reactionType]);
  }
}
