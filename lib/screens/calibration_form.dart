import 'package:flutter/material.dart';

class CalibrationForm extends StatefulWidget {
  final Function(double, double, double, double) onCalibrate;

  CalibrationForm({required this.onCalibrate});

  @override
  _CalibrationFormState createState() => _CalibrationFormState();
}

class _CalibrationFormState extends State<CalibrationForm> {
  final _formKey = GlobalKey<FormState>();
  double _s = 0, _dn = 0, _in = 0, _x = 0;

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: <Widget>[
          TextFormField(
            decoration: InputDecoration(labelText: 'S'),
            keyboardType: TextInputType.number,
            onSaved: (value) => _s = double.parse(value!),
          ),
          TextFormField(
            decoration: InputDecoration(labelText: 'Dn'),
            keyboardType: TextInputType.number,
            onSaved: (value) => _dn = double.parse(value!),
          ),
          TextFormField(
            decoration: InputDecoration(labelText: 'In'),
            keyboardType: TextInputType.number,
            onSaved: (value) => _in = double.parse(value!),
          ),
          TextFormField(
            decoration: InputDecoration(labelText: 'x'),
            keyboardType: TextInputType.number,
            onSaved: (value) => _x = double.parse(value!),
          ),
          ElevatedButton(
            onPressed: () {
              if (_formKey.currentState!.validate()) {
                _formKey.currentState!.save();
                widget.onCalibrate(_s, _dn, _in, _x);
              }
            },
            child: Text('Calibrate'),
          ),
        ],
      ),
    );
  }
}
