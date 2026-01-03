# ===================================================================================
# EnvirosAgro Operating System (EAOS)
# Core Service: Data & Logic
# Description: This is the "brain" of the EAOS. It contains the core
#              business logic and proprietary algorithms, including the
#              Dissemination Engine and the Proof-of-Sustainability mining logic.
#              This service is stateless and relies on other core services for
#              all external interactions.
# ===================================================================================

import math
import time

class LogicService:
    """
    Encapsulates the core intellectual property of the EnvirosAgro platform.
    It is a pure, stateless service that performs calculations and makes decisions.
    """

    def __init__(self, registry_service, network_service):
        """
        Initializes the LogicService with dependencies on other core services.
        """
        self.registry = registry_service
        self.network = network_service
        print("[EAOS_Logic] Data & Logic Service Initialized.")

    # --- ALGORITHM 1: The Dissemination Engine ---
    def run_dissemination_engine(self, raw_data: dict, source_metadata: dict) -> dict:
        """
        Processes raw agricultural data, verifies its source, calculates its
        sustainability score, and assigns a quality tag.
        """
        print(f"[EAOS_Logic] Running Dissemination Engine...")

        # 1. Check Source Credibility via the Network Service
        if source_metadata.get('type') == 'EXTRANET':
            if not self.network.validate_ingest_on_chain(source_metadata['id']):
                return {"status": "REJECTED", "reason": "Payment Required"}

        # 2. Apply EnvirosAgro Equations (The 'm-score' calculation)
        S = raw_data.get('crop_cycle', 90)
        Dn = raw_data.get('rainfall_days', 0)
        In = raw_data.get('soil_retention', 0)
        x = raw_data.get('practice_level', 1)
        Ca = (1 * x) + 1
        m = math.sqrt((Dn * In * Ca) / S) if S > 0 else 0

        # 3. Disseminate Quality Tag
        quality_tag = "UNVERIFIED_DRAFT"
        if m > 15:
            quality_tag = "PREMIUM_VERIFIED"
        elif m > 8:
            quality_tag = "STANDARD_VERIFIED"

        # 4. Prepare a record for the Registry Service
        registry_entry = {
            "data": raw_data,
            "source": source_metadata,
            "quality_tag": quality_tag,
            "sustainability_score": round(m, 2),
            "processed_at": math.floor(time.time())
        }
        
        # 5. Commit to the database via the Registry Service
        committed_record = self.registry.insert_one("registry", registry_entry)
        print(f"[EAOS_Logic] Dissemination complete. Record committed with ID: {committed_record['_id']}")
        return {"status": "COMMITTED", "record": committed_record}


    # --- ALGORITHM 2: Proof-of-Sustainability Mining ---
    def mine_proof_of_sustainability(self, user_id: str, reaction_data: dict) -> dict:
        """
        Calculates and allocates a mining reward based on a user's reaction.
        This function is designed to be called by an event handler (e.g., when a
        new document is created in a 'reactions' collection).
        """
        print(f"[EAOS_Logic] Mining Proof-of-Sustainability for user: {user_id}")
        reaction_type = reaction_data['reactionType']

        # 1. Get User's Mining Power from the Registry Service
        user = self.registry.find_one("users", {"_id": user_id})
        if not user or 'sustainability_profile' not in user:
            raise ValueError("User or profile not found.")
        mining_power = math.sqrt(user['sustainability_profile'].get('m', 1.0))

        # 2. Define Base Reward
        base_reward = {"SIMPLE_VOTE": 2, "DETAILED_REVIEW": 10, "EVIDENCE_UPLOAD": 50}.get(reaction_type, 0)

        # 3. Check for Thrust Bonus (logic would be more complex in production)
        has_all_five = len(user['sustainability_profile'].get('thrust_history', [])) >= 5
        multiplier = 2.0 if has_all_five else 1.0

        # 4. Calculate Final Mint Amount
        final_mint_amount = base_reward * mining_power * multiplier

        if final_mint_amount <= 0:
            return {"status": "NO_REWARD", "minted": 0}

        # 5. Prepare ledger entry and user wallet update for the Registry Service
        #    In a real system, these would happen inside a database transaction.
        ledger_entry = {
            "userId": user_id,
            "amount": final_mint_amount,
            "type": "MINT",
            "reason": f"Proof-of-Sustainability: {reaction_type}",
            "timestamp": math.floor(time.time())
        }
        self.registry.insert_one("ledger", ledger_entry)

        # This is a simplified update. A real implementation would use $inc.
        user["wallet"]["balance"] += final_mint_amount
        user["wallet"]["lifetime"] += final_mint_amount
        # The registry service would need an `update_one` method for this.
        print(f"[EAOS_Logic] Mining complete. Minted {final_mint_amount} EAC for user {user_id}")

        return {"status": "SUCCESS", "minted": final_mint_amount}
