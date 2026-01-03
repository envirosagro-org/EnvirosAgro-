import 'package:realm/realm.dart';

part 'user_model.g.dart';

@RealmModel()
class _UserModel {
  @PrimaryKey()
  late ObjectId id;

  late String authId;
  late double walletBalance;
  late _Sustainability? sustainability;
}

@RealmModel(ObjectType.embeddedObject)
class _Sustainability {
  late double m;
  late double Ca;
  late DateTime lastCalibrated;
}
