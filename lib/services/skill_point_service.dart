
class SkillPointService {
  // Converts a numerical score into a descriptive tier.
  String getSkillTier(int points) {
    if (points > 100) return "Expert";
    if (points > 50) return "Proficient";
    if (points > 20) return "Competent";
    return "Beginner";
  }
}
