# ===================================================================================
# EnvirosAgro Operating System (EAOS) - Full System Demonstration v2
# Description: This script demonstrates all core services of the EAOS working
#              in concert to perform a complete, end-to-end workflow, from
#              user authentication to data dissemination and token mining.
# ===================================================================================

import os
from eaos.core.registry.registry_service import RegistryService
from eaos.core.identity.auth_service import AuthService
from eaos.core.network.network_service import NetworkService
from eaos.core.logic.logic_service import LogicService

if __name__ == "__main__":
    print("--- Initializing EnvirosAgro Operating System (EAOS) v2 ---\n")

    # --- Configuration ---
    os.environ["EAOS_SECRET_KEY"] = "a-new-secure-and-random-secret-for-production"
    DATABASE_CONNECTION_STRING = "mongodb+srv://user:pass@cluster.mongodb.net/EnvirosAgroDB"

    # ===============================================================
    # 1. Initialize All Core Services
    # ===============================================================
    print("1. Initializing Core Services...")
    registry = RegistryService(DATABASE_CONNECTION_STRING)
    auth = AuthService(registry)
    network = NetworkService()
    logic = LogicService(registry, network)
    print("All services are online.")
    print("\n" + "-"*50 + "\n")

    # ===============================================================
    # 2. User Onboarding Workflow
    # ===============================================================
    print("2. User Onboarding Workflow...")
    try:
        user_email = "partner.bob@envirosagro.com"
        user_pass = "strong_password_456"
        user_record = auth.register_user(user_email, user_pass)
        user_id = user_record['_id']
        token = auth.login_user(user_email, user_pass)
        print(f"User '{user_email}' onboarded successfully. User ID: {user_id}")
    except ValueError as e:
        print(f"User onboarding failed: {e}")
        user_id = None
    print("\n" + "-"*50 + "\n")

    # ===============================================================
    # 3. Data Dissemination Workflow (External Partner)
    # ===============================================================
    if user_id:
        print("3. Data Dissemination Workflow...")
        # This data comes from an external, trusted partner via an API call
        partner_data = {
            "crop_cycle": 150,
            "rainfall_days": 60,
            "soil_retention": 50,
            "practice_level": 9,
            "ghg_emissions_cut": 0.25
        }
        partner_metadata = {
            "type": "EXTRANET",
            "id": "0xEA05...FDC2", # Partner's Blockchain ID
            "source_api_version": "v1.3"
        }
        
        # The Logic Service orchestrates the entire process
        result = logic.run_dissemination_engine(partner_data, partner_metadata)
        print(f"Dissemination Engine Result: {result['status']}")
        print(f"New Content Quality Tag: {result['record']['quality_tag']}")
        print("\n" + "-"*50 + "\n")

    # ===============================================================
    # 4. Proof-of-Sustainability Mining Workflow
    # ===============================================================
    if user_id:
        print("4. Proof-of-Sustainability Mining Workflow...")
        # The user sees the new data in the UI and submits a detailed review
        user_reaction = {
            "userId": user_id,
            "contentId": result['record']['_id'],
            "reactionType": "DETAILED_REVIEW",
            "sentiment": "POSITIVE",
            "reviewText": "This data looks solid. The GHG reduction is significant."
        }
        
        # The Logic Service calculates the reward
        mining_result = logic.mine_proof_of_sustainability(user_id, user_reaction)
        print(f"Mining Result: {mining_result['status']}")
        print(f"Amount Minted: {mining_result['minted']} EAC")

    print("\n--- EAOS v2 Demonstration Complete ---")
