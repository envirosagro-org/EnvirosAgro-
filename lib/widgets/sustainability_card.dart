import 'package:flutter/material.dart';
import 'package:cloud_functions/cloud_functions.dart'; 

// --- WIDGET: Sustainability Monitor ---
class SustainabilityCard extends StatefulWidget {
  final Map<String, dynamic> sustData; // Data passed from the main dashboard stream

  const SustainabilityCard({Key? key, required this.sustData}) : super(key: key);

  @override
  _SustainabilityCardState createState() => _SustainabilityCardState();
}

class _SustainabilityCardState extends State<SustainabilityCard> {
  // Input Controllers (Default values based on template)
  double _x = 2.0;   // Base Factor (Practice Level)
  double _Dn = 20.0; // Rainfall Days
  double _In = 15.0; // Soil Moisture Days
  double _S = 90.0;  // Crop Cycle Days
  bool _isLoading = false;

  @override
  Widget build(BuildContext context) {
    // Fetch calculated values from Firestore (or default to 0)
    double mScore = (widget.sustData['m'] ?? 0).toDouble();
    double caScore = (widget.sustData['Ca'] ?? 0).toDouble();

    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            Row(
              children: const [
                Icon(Icons.eco, color: Colors.green),
                SizedBox(width: 8),
                Text("Sustainability Monitor", 
                     style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
              ],
            ),
            const Divider(),

            // 1. The Output Display (Visualizing 'm' and 'Ca')
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildScoreColumn("Time Constant (m)", mScore.toStringAsFixed(2), Colors.blue),
                _buildScoreColumn("Agri-Code C(a)", caScore.toStringAsFixed(2), Colors.orange),
              ],
            ),
            const SizedBox(height: 15),

            // 2. The Input Simulator (Sheet 1 Inputs)
            const Text("Simulator: Adjust Inputs", style: TextStyle(fontWeight: FontWeight.bold)),
            
            // Slider for Agricultural Base Factor (x)
            _buildSlider("Practice Level (x)", _x, 1, 10, (val) => setState(() => _x = val)),
            
            // Slider for Soil Moisture (In)
            _buildSlider("Soil Retention (In)", _In, 1, 60, (val) => setState(() => _In = val)),

            const SizedBox(height: 10),
            
            // Calculate Button
            ElevatedButton.icon(
              icon: _isLoading ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2)) : const Icon(Icons.calculate),
              label: Text(_isLoading ? "Calculating..." : "Calculate & Update Profile"),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.green[800],
                minimumSize: const Size(double.infinity, 40),
              ),
              onPressed: _isLoading ? null : _runCalculation,
            ),
          ],
        ),
      ),
    );
  }

  // Helper to call the Cloud Function
  Future<void> _runCalculation() async {
    setState(() => _isLoading = true);
    try {
      final result = await FirebaseFunctions.instance.httpsCallable('calculateSustainability').call({
        'S': _S,
        'Dn': _Dn,
        'In': _In,
        'x': _x,
        'r': 1.0, // Defaulting growth rate to 1.0 for simplicity
        'n': 1,
      });
      // The StreamBuilder in the parent widget will automatically update the UI 
      // when the Cloud Function updates the Firestore document.
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("Sustainability Profile Updated!")));
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Error: $e")));
    } finally {
      setState(() => _isLoading = false);
    }
  }

  Widget _buildScoreColumn(String label, String value, Color color) {
    return Column(
      children: [
        Text(value, style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: color)),
        Text(label, style: const TextStyle(fontSize: 12, color: Colors.grey)),
      ],
    );
  }

  Widget _buildSlider(String label, double val, double min, double max, Function(double) onChanged) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text("$label: ${val.toStringAsFixed(1)}"),
        Slider(
          value: val,
          min: min,
          max: max,
          divisions: (max - min).toInt(),
          activeColor: Colors.green,
          onChanged: onChanged,
        ),
      ],
    );
  }
}
