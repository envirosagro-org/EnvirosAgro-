import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../api_service.dart';
import '../models/types.dart';

class AuthGate extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return StreamBuilder<User?>(
      stream: FirebaseAuth.instance.authStateChanges(),
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          return MongoDashboard();
        } else {
          return LoginScreen();
        }
      },
    );
  }
}

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final ApiService _api = ApiService();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;

  void _login() async {
    setState(() { _isLoading = true; });
    try {
      await _api.signInWithEmailPassword(
        _emailController.text.trim(),
        _passwordController.text.trim(),
      );
    } on FirebaseAuthException catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(e.message ?? "Login Failed")));
    } finally {
      setState(() { _isLoading = false; });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Login")),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(controller: _emailController, decoration: InputDecoration(labelText: 'Email')),
            TextField(controller: _passwordController, obscureText: true, decoration: InputDecoration(labelText: 'Password')),
            SizedBox(height: 20),
            _isLoading ? CircularProgressIndicator() : ElevatedButton(onPressed: _login, child: Text("Login")),
          ],
        ),
      ),
    );
  }
}

class MongoDashboard extends StatefulWidget {
  @override
  _MongoDashboardState createState() => _MongoDashboardState();
}

class _MongoDashboardState extends State<MongoDashboard> {
  final ApiService _api = ApiService();

  MongoUser? _user;
  List<RegistryItem> _registryItems = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _initData();
  }

  Future<void> _initData() async {
    setState(() { _isLoading = true; });
    try {
      final user = await _api.getUserData();
      final items = await _api.getRegistryItems();
      setState(() {
        _user = user;
        _registryItems = items;
      });
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Error: $e")));
      if (e.toString().contains("Not authenticated")) {
        _api.signOut();
      }
    } finally {
      setState(() { _isLoading = false; });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("EnvirosAgro Dashboard"),
        actions: [IconButton(icon: Icon(Icons.logout), onPressed: () => _api.signOut())],
      ),
      body: _isLoading
          ? Center(child: CircularProgressIndicator())
          : RefreshIndicator(
              onRefresh: _initData,
              child: Column(
                children: [
                  _buildCard("EAC Wallet", "${_user?.wallet.balance.toStringAsFixed(2) ?? '0.00'} Coins"),
                  _buildCard("Sust. Constant (m)", _user?.sustainability.m.toStringAsFixed(2) ?? '1.00'),
                  ElevatedButton(
                    onPressed: () async {
                      var res = await _api.calibrateSustainability(90, 20, 15, 5, null, null);
                      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Recalibrated! New m-score: ${res['m']}")));
                      _initData(); // Refresh data
                    },
                    child: Text("Recalibrate Sustainability"),
                  ),
                  Expanded(
                    child: ListView.builder(
                      itemCount: _registryItems.length,
                      itemBuilder: (context, index) {
                        final item = _registryItems[index];
                        return ListTile(
                          title: Text(item.title),
                          subtitle: Text("Thrust: ${item.thrust}"),
                          trailing: IconButton(
                            icon: Icon(Icons.thumb_up, color: Colors.green),
                            onPressed: () async {
                              await _api.mineReaction(item.id, "VOTE");
                              ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Mined EAC!")));
                              _initData(); // Refresh data
                            },
                          ),
                        );
                      },
                    ),
                  )
                ],
              ),
            ),
    );
  }

  Widget _buildCard(String title, String value) {
    return Card(
      margin: EdgeInsets.all(10),
      child: ListTile(
        title: Text(title, style: TextStyle(color: Colors.grey)),
        subtitle: Text(value, style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
      ),
    );
  }
}
