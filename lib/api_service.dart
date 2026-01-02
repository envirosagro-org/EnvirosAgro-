import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:firebase_auth/firebase_auth.dart';
import '../models/types.dart';

class ApiService {
  final String _baseUrl = 'https://envirosagro.pages.dev'; // Using the real URL
  final FirebaseAuth _auth = FirebaseAuth.instance;

  Future<String?> _getIdToken() async {
    User? user = _auth.currentUser;
    if (user == null) return null;
    return await user.getIdToken();
  }

  Future<UserCredential> signInWithEmailPassword(String email, String password) async {
    return await _auth.signInWithEmailAndPassword(email: email, password: password);
  }
  
  Future<void> signOut() async {
    return await _auth.signOut();
  }

  Future<MongoUser> getUserData() async {
    final idToken = await _getIdToken();
    if (idToken == null) throw Exception('Not authenticated');

    final response = await http.post(
      Uri.parse('$_baseUrl/api/getUser'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $idToken',
      },
      body: jsonEncode({'userId': _auth.currentUser!.uid}),
    );

    if (response.statusCode == 200) {
      return MongoUser.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to get user data: ${response.body}');
    }
  }

  Future<List<RegistryItem>> getRegistryItems() async {
    final response = await http.get(Uri.parse('$_baseUrl/api/getRegistryItems'));

    if (response.statusCode == 200) {
      final List<dynamic> itemsJson = jsonDecode(response.body);
      return itemsJson.map((json) => RegistryItem.fromJson(json)).toList();
    } else {
      throw Exception('Failed to fetch registry items: ${response.body}');
    }
  }

  Future<Map<String, dynamic>> calibrateSustainability(
      double S, double Dn, double In, double x, double? r, double? n) async {
    final idToken = await _getIdToken();
    if (idToken == null) throw Exception('Not authenticated');

    final response = await http.post(
      Uri.parse('$_baseUrl/api/calculateSustainability'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $idToken',
      },
      body: jsonEncode({
        'S': S, 'Dn': Dn, 'In': In, 'x': x, 'r': r, 'n': n,
        'auth_id': _auth.currentUser!.uid,
      }),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to calibrate: ${response.body}');
    }
  }

  Future<void> mineReaction(String contentId, String type) async {
    final idToken = await _getIdToken();
    if (idToken == null) throw Exception('Not authenticated');

    final response = await http.post(
      Uri.parse('$_baseUrl/api/mineOnReaction'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $idToken',
      },
      body: jsonEncode({
        'contentId': contentId,
        'reactionType': type,
        'userId': _auth.currentUser!.uid,
      }),
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to mine: ${response.body}');
    }
  }
}
