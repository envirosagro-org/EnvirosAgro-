from engines.dissemination_engine import dissemination_engine
import json

# --- Sample Data ---

# Sample 1: Data from a verified farmer via the mobile app (Intranet)
intranet_data = {
    'crop_cycle': 120,          # 120 days for this specific crop
    'rainfall_days': 40,       # 40 days of significant rainfall
    'soil_retention': 30,      # Soil holds moisture for 30 days post-rain
    'practice_level': 7,       # Farmer uses good practices (e.g., crop rotation, precision irrigation)
    'fertilizer_reduced': 0.15 # 15% reduction in fertilizer use vs baseline
}

source_1 = {
    'type': 'INTRANET', 
    'id': 'farmer_app_user_12345',
    'trust_level': 'HIGH'
}

# Sample 2: Data from a B2B partner (Extranet)
# This partner has paid their access fee on the blockchain.
extranet_data = {
    'crop_cycle': 90,           # Standard 90-day cycle for this data provider
    'rainfall_days': 15,       # Lower rainfall area
    'soil_retention': 10,      # Sandy soil, poor retention
    'practice_level': 3,       # Basic, non-optimized farming practices
    'ghg_emissions_cut': 0.05  # Minimal GHG reduction reported
}

source_2 = {
    'type': 'EXTRANET',
    'id': '0xAbC...123', # Partner's wallet address
    'trust_level': 'PENDING_VALIDATION'
}


if __name__ == "__main__":
    print("--- Running Dissemination Engine ---\n")

    # Process the high-quality data from the internal farmer app
    print("1. Processing High-Quality INTRANET Data...")
    intranet_result = dissemination_engine(intranet_data, source_1)
    print(json.dumps(intranet_result, indent=2))
    print("\n" + "-"*40 + "\n")

    # Process the lower-quality data from the external partner
    print("2. Processing Lower-Quality EXTRANET Data...")
    extranet_result = dissemination_engine(extranet_data, source_2)
    print(json.dumps(extranet_result, indent=2))
    print("\n--- Engine Run Complete ---")
