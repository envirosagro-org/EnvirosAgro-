import 'package:flutter/material.dart';
import '../services/atlas_service.dart';

class CalibrationForm extends StatefulWidget {
  final AtlasService atlasService;

  const CalibrationForm({Key? key, required this.atlasService}) : super(key: key);

  @override
  _CalibrationFormState createState() => _CalibrationFormState();
}

class _CalibrationFormState extends State<CalibrationForm> {
  final _formKey = GlobalKey<FormState>();
  double _a = 0, _b = 0, _c = 0, _d = 0;

  void _submitForm() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      await widget.atlasService.calibrateSustainability(_a, _b, _c, _d);
      Navigator.of(context).pop();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Form(
        key: _formKey,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text("Calibrate Sustainability", style: Theme.of(context).textTheme.headline6),
            TextFormField(
              decoration: InputDecoration(labelText: 'Value A'),
              keyboardType: TextInputType.number,
              validator: (val) => val!.isEmpty ? 'Please enter a value' : null,
              onSaved: (val) => _a = double.parse(val!),
            ),
            TextFormField(
              decoration: InputDecoration(labelText: 'Value B'),
              keyboardType: TextInputType.number,
              validator: (val) => val!.isEmpty ? 'Please enter a value' : null,
              onSaved: (val) => _b = double.parse(val!),
            ),
            TextFormField(
              decoration: InputDecoration(labelText: 'Value C'),
              keyboardType: TextInputType.number,
              validator: (val) => val!.isEmpty ? 'Please enter a value' : null,
              onSaved: (val) => _c = double.parse(val!),
            ),
            TextFormField(
              decoration: InputDecoration(labelText: 'Value D'),
              keyboardType: TextInputType.number,
              validator: (val) => val!.isEmpty ? 'Please enter a value' : null,
              onSaved: (val) => _d = double.parse(val!),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _submitForm,
              child: Text('Calculate'),
            ),
          ],
        ),
      ),
    );
  }
}
