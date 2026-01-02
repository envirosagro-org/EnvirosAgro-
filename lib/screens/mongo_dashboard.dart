import 'package:flutter/material.dart';
import 'package:realm/realm.dart'; // Using Realm SDK for Mongo
import '../services/atlas_service.dart';

class MongoDashboard extends StatefulWidget {
  @override
  _MongoDashboardState createState() => _MongoDashboardState();
}

class _MongoDashboardState extends State<MongoDashboard> {
  final AtlasService _atlas = AtlasService();
  
  // Local state for demonstration (Real app would use Realm Stream)
  double walletBalance = 0.0;
  double mScore = 0.0;

  @override
  void initState() {
    super.initState();
    _initData();
  }

  void _initData() async {
    await _atlas.login();
    // In a full Realm app, you would define a RealmObject model and 
    // use a StreamBuilder to listen to changes automatically.
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("EnvirosAgro (MongoDB Powered)")),
      body: Column(
        children: [
          // 1. WALLET CARD
          _buildCard("EAC Wallet", "${walletBalance.toStringAsFixed(2)} Coins"),

          // 2. SUSTAINABILITY CARD
          _buildCard("Sust. Constant (m)", mScore.toStringAsFixed(2)),
          
          ElevatedButton(
            onPressed: () async {
              // Simulate Calibration Input
              var res = await _atlas.calibrateSustainability(90, 20, 15, 5); 
              setState(() {
                mScore = res['m'].toDouble();
              });
            },
            child: Text("Recalibrate Sustainability (Run Math)"),
          ),

          // 3. MINING FEED
          Expanded(child: ListView(
            children: [
              ListTile(
                title: Text("New Hydroponic Method"),
                subtitle: Text("Thrust: Technical"),
                trailing: IconButton(
                  icon: Icon(Icons.thumb_up, color: Colors.green),
                  onPressed: () async {
                    await _atlas.mineReaction("64f1a2b...", "VOTE");
                    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Mined EAC!")));
                  },
                ),
              )
            ],
          ))
        ],
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
