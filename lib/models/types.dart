class MongoUser {
  final String id;
  final String authId;
  final Wallet wallet;
  final Sustainability sustainability;

  MongoUser({required this.id, required this.authId, required this.wallet, required this.sustainability});

  factory MongoUser.fromJson(Map<String, dynamic> json) {
    return MongoUser(
      id: json['_id'],
      authId: json['auth_id'],
      wallet: Wallet.fromJson(json['wallet'] ?? {'balance': 0.0, 'lifetime': 0.0}),
      sustainability: Sustainability.fromJson(json['sustainability'] ?? {'m': 1.0}),
    );
  }
}

class Wallet {
  final double balance;
  final double lifetime;

  Wallet({required this.balance, required this.lifetime});

  factory Wallet.fromJson(Map<String, dynamic> json) {
    return Wallet(
      balance: (json['balance'] ?? 0.0).toDouble(),
      lifetime: (json['lifetime'] ?? 0.0).toDouble(),
    );
  }
}

class Sustainability {
  final double m;

  Sustainability({required this.m});

  factory Sustainability.fromJson(Map<String, dynamic> json) {
    return Sustainability(
      m: (json['m'] ?? 1.0).toDouble(),
    );
  }
}

class RegistryItem {
  final String id;
  final String title;
  final String thrust;

  RegistryItem({required this.id, required this.title, required this.thrust});

  factory RegistryItem.fromJson(Map<String, dynamic> json) {
    return RegistryItem(
      id: json['_id'],
      title: json['title'] ?? 'Untitled',
      thrust: json['thrust'] ?? 'General',
    );
  }
}
