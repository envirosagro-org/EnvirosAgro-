import 'package:realm/realm.dart';
import '../models/user_model.dart';

class AtlasService {
  static const String _appId = '6957933ebaecce170fa892b1'; 
  final App _app = App(AppConfiguration(_appId));

  User? _currentUser;
  Realm? _realm;

  Future<void> login() async {
    if (_currentUser == null) {
      _currentUser = await _app.logIn(Credentials.anonymous());
      _realm = Realm(Configuration.flexibleSync(_currentUser!, [UserModel.schema]));
    }
  }

  Stream<RealmResultsChanges<UserModel>> getProfileStream() {
    if (_realm == null) throw Exception("Realm not initialized. Call login() first.");
    return _realm!.all<UserModel>().changes;
  }

  Future<Map<String, dynamic>> calibrateSustainability(double-a, double-b, double-c, double-d) async {
    if (_currentUser == null) await login();
    
    final result = await _currentUser!.functions.call('calculateSustainability', [a, b, c, d]);
    return result as Map<String, dynamic>;
  }

  Future<void> mineReaction(String documentId, String reactionType) async {
    if (_currentUser == null) await login();
    
    await _currentUser!.functions.call('mineOnReaction', [documentId, reactionType]);
  }

  void dispose() {
    _realm?.close();
  }
}
