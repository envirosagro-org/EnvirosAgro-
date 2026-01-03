import 'package:flutter/material.dart';
import '../models/user_model.dart';
import '../services/firestore_service.dart';
import '../services/skill_point_service.dart';
import '../widgets/sustainability_card.dart';

class DashboardScreen extends StatelessWidget {
  final String userId;
  final FirestoreService _firestoreService = FirestoreService();
  final SkillPointService _skillPointService = SkillPointService();

  DashboardScreen({Key? key, required this.userId}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<EnvirosUser>(
      stream: _firestoreService.streamUser(userId),
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return Scaffold(
            body: Center(child: Text("Error: ${snapshot.error}")),
          );
        }
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Scaffold(
            body: Center(child: CircularProgressIndicator()),
          );
        }

        final user = snapshot.data!;

        return Scaffold(
          backgroundColor: Colors.grey[100],
          appBar: AppBar(
            title: const Text("EnvirosAgro Hub"),
            backgroundColor: Colors.green[800],
            actions: [
              IconButton(onPressed: () {}, icon: const Icon(Icons.notifications)),
              const CircleAvatar(
                backgroundImage: NetworkImage("https://via.placeholder.com/150"), // Placeholder
              ),
              const SizedBox(width: 10),
            ],
          ),
          body: SingleChildScrollView(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildWalletCard(user),
                const SizedBox(height: 20),

                // SECTION B: "My Agro-DNA" (Skills)
                const Text("My Agro-DNA (Verified Skills)", 
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                const SizedBox(height: 10),
                _buildSkillSection(user.skills),
                const SizedBox(height: 20),

                // NEW SECTION: Sustainability Engine
                SustainabilityCard(
                  sustData: user.sustainabilityProfile ?? {},
                ),
                const SizedBox(height: 20),

                // SECTION C: Career Opportunities
                const Text("Career Opportunities", 
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                const SizedBox(height: 10),
                _buildJobFeed(),
                const SizedBox(height: 10),
                _buildCareerPathwayCard(),

              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildWalletCard(EnvirosUser user) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(colors: [Colors.green.shade900, Colors.green.shade600]),
        borderRadius: BorderRadius.circular(15),
        boxShadow: [BoxShadow(color: Colors.green.withOpacity(0.3), blurRadius: 10, offset: const Offset(0, 5))],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text("Current Balance", style: TextStyle(color: Colors.white70)),
              Row(
                children: [
                  const Icon(Icons.monetization_on, color: Colors.yellowAccent, size: 28),
                  const SizedBox(width: 8),
                  Text("${user.walletBalance} EAC", style: const TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.bold)),
                ],
              ),
              const SizedBox(height: 5),
              Text("Lifetime Earned: ${user.lifetimeScore}", style: const TextStyle(color: Colors.white54, fontSize: 12)),
            ],
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(color: Colors.white24, borderRadius: BorderRadius.circular(20)),
            child: Text(
              user.rank,
              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
            ),
          )
        ],
      ),
    );
  }

  Widget _buildSkillSection(Map<String, dynamic> skills) {
    if (skills.isEmpty) {
      return Container(
        width: double.infinity,
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(10)),
        child: const Text("No skills verified yet. Upload documents or complete tutorials to earn skill tags!"),
      );
    }

    return Wrap(
      spacing: 8.0,
      runSpacing: 8.0,
      children: skills.entries.map((entry) {
        int score = entry.value;
        String tier = _skillPointService.getSkillTier(score);
        Color chipColor = score > 100 ? Colors.green[800]! : Colors.green[400]!;

        return Chip(
          avatar: CircleAvatar(
            backgroundColor: Colors.white,
            child: Text(score.toString(), style: TextStyle(fontSize: 10, color: chipColor)),
          ),
          label: Text('${entry.key} ($tier)'),
          backgroundColor: chipColor.withOpacity(0.1),
          labelStyle: TextStyle(color: chipColor, fontWeight: FontWeight.bold),
          side: BorderSide(color: chipColor.withOpacity(0.5)),
        );
      }).toList(),
    );
  }

  Widget _buildJobFeed() {
    final job = {
      "title": "Regional Sustainability Lead",
      "org": "GreenEarth Co-op",
      "location": "Kiriaini, Kenya",
      "salary": "\$2,500 - \$3,500",
      "posted": "2 days ago",
    };

    return _buildJobCard(job);
  }

  Widget _buildJobCard(Map<String, String> job) {
    return Card(
      elevation: 2,
      margin: const EdgeInsets.only(bottom: 12),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      child: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(job['title']!, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
            const SizedBox(height: 4),
            Text("${job['org']!} • ${job['location']!}", style: TextStyle(color: Colors.grey[700])),
            const Divider(height: 20),
            Row(
              children: [
                Icon(Icons.monetization_on_outlined, size: 16, color: Colors.grey[600]),
                const SizedBox(width: 4),
                Text(job['salary']!, style: TextStyle(color: Colors.grey[800])),
                const Spacer(),
                Text(job['posted']!, style: const TextStyle(fontSize: 12, color: Colors.grey)),
              ],
            ),
            const SizedBox(height: 8),
            ElevatedButton(
              onPressed: () {},
              child: const Text("View Details"),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.green.shade700,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
              ),
            )
          ],
        ),
      ),
    );
  }

  Widget _buildCareerPathwayCard() {
    return Card(
      elevation: 2,
      color: const Color(0xFFFFFBEB), // Amber 50
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
        side: const BorderSide(color: Color(0xFFFEF3C7)), // Amber 100
      ),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          children: [
            const Icon(Icons.school, color: Color(0xFFD97706), size: 32), // Amber 600
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    "Certified Sustainable Agronomist (CSA)",
                    style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF92400E)), // Amber 800
                  ),
                  const SizedBox(height: 4),
                  const Text("EnvirosAgro Academy • 6 Months • Advanced"),
                  const SizedBox(height: 8),
                  ElevatedButton(
                    onPressed: () {},
                    child: const Text("Learn More"),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFFD97706),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                    ),
                  )
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
