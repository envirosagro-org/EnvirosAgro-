import 'package:realm/realm.dart';

part 'types.g.dart';

@RealmModel()
class _Registry {
  @MapTo('_id')
  @PrimaryKey()
  late ObjectId id;

  late String title;
  late String type;
  double qualityScore = 0;
  double sourceMScore = 0;
}

@RealmModel()
class _Ledger {
  late String uid;
  double amount = 0;
  late String type;
  late DateTime timestamp;
}
