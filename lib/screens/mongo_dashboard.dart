import 'package:flutter/material.dart';
import 'package:realm/realm.dart';
import '../services/atlas_service.dart';
import '../models/user_model.dart';
import 'calibration_form.dart';

class MongoDashboard extends StatefulWidget {
  @override
  _MongoDashboardState createState() => _MongoDashboardState();
}

class _MongoDashboardState extends State<MongoDashboard> {
  final AtlasService _atlas = AtlasService();

  @override
  void initState() {
    super.initState();
    _atlas.login();
  }

  @override
  void dispose() {
    _atlas.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("EnvirosAgro (MongoDB Powered)")),
      body: StreamBuilder<RealmResultsChanges<UserModel>>(
        stream: _atlas.getProfileStream(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            final user = snapshot.data!.results.first;
            return Column(
              children: [
                _buildCard("EAC Wallet", "${user.walletBalance.toStringAsFixed(2)} Coins"),
                _buildCard("Sust. Constant (m)", user.sustainability?.m.toStringAsFixed(2) ?? "N/A"),
                ElevatedButton(
                  onPressed: () => _showCalibrationForm(context),
                  child: Text("Recalibrate Sustainability"),
                ),
                Expanded(
                  child: ListView.builder(
                    itemCount: 10, // Replace with dynamic data
                    itemBuilder: (context, index) {
                      return ListTile(
                        title: Text("Mining Feed Item $index"),
                        subtitle: Text("Thrust: Technical"),
                        trailing: IconButton(
                          icon: Icon(Icons.thumb_up, color: Colors.green),
                          onPressed: () async {
                            await _atlas.mineReaction("some_doc_id", "VOTE");
                            ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Mined EAC!")));
                          },
                        ),
                      );
                    },
                  ),
                ),
              ],
            );
          }
          return Center(child: CircularProgressIndicator());
        },
      ),
    );
  }

  void _showCalibrationForm(BuildContext context) {
    showModalBottomSheet(
      context: context,
      builder: (_) => CalibrationForm(atlasService: _atlas),
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
