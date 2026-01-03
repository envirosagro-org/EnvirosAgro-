import 'package:flutter/material.dart';
import 'package:enviros_app/screens/calibration_form.dart';
import 'package:enviros_app/services/api_service.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String _message = '';

  void _calibrate(double s, double dn, double inVal, double x) async {
    try {
      final result = await ApiService.calibrate(s, dn, inVal, x);
      setState(() {
        _message = 'Calibration successful: Ca=${result['Ca']}, m=${result['m']}';
      });
    } catch (e) {
      setState(() {
        _message = 'Error calibrating: $e';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('EnvirosAgro'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: <Widget>[
            CalibrationForm(onCalibrate: _calibrate),
            SizedBox(height: 20),
            Text(_message),
          ],
        ),
      ),
    );
  }
}
