import math
import time

# --- Mock/Placeholder Functions ---
# In a real implementation, these would be in separate modules and would
# interact with a blockchain node and a database.

def check_blockchain_payment(partner_id: str) -> bool:
    """
    Placeholder for a function that calls the 'validateIngest' method 
    on the EnvirosAgroExtranetGate smart contract.
    
    Args:
        partner_id: The blockchain address of the partner.
        
    Returns:
        True if the partner is authorized, False otherwise.
    """
    print(f"[Blockchain] Validating access for partner: {partner_id[:10]}... -> MOCK: Authorized")
    # Real implementation would use a web3 library (e.g., web3.py or ethers.py)
    # to connect to an Ethereum node and call the contract.
    return True

class MockDBRegistry:
    def commit(self, record: dict) -> dict:
        """ 
        Placeholder for a database commit operation. 
        Returns the committed record, simulating a successful DB write.
        """
        print(f"[DB Registry] Committing record with Quality Tag: {record['quality_tag']}")
        return {"status": "COMMITTED", "record": record}

db_registry = MockDBRegistry()

def determine_thrust(raw_data: dict) -> str:
    """
    Categorizes the data based on its primary impact area. 
    This is based on the 'thrust' categories from your data models.
    """
    if raw_data.get('fertilizer_reduced', 0) > 0.1:
        return "FERTILIZER_REDUCTION"
    if raw_data.get('ghg_emissions_cut', 0) > 0.1:
        return "GHG_EMISSION_CUT"
    if raw_data.get('soil_health_index', 0) > 5:
        return "SOIL_HEALTH"
    return "GENERAL_SUSTAINABILITY"

# --- Core Dissemination Engine ---

def dissemination_engine(raw_data: dict, source_metadata: dict) -> dict:
    """
    Processes raw agricultural data, verifies its source, calculates its
    sustainability score, assigns a quality tag, and commits it to the registry.
    """
    
    # 1. Check Source Credibility (Intranet vs Extranet)
    if source_metadata.get('type') == 'EXTRANET':
        if not check_blockchain_payment(source_metadata['id']):
            return {"status": "REJECTED", "reason": "Payment Required"}

    # 2. Apply EnvirosAgro Equations
    # Extract inputs, using .get() for safety
    S = raw_data.get('crop_cycle', 90)       # Crop Cycle Requirement (days)
    Dn = raw_data.get('rainfall_days', 0)    # Direct Nature (Rainfall days)
    In = raw_data.get('soil_retention', 0) # Indirect Nature (Soil moisture days)
    x = raw_data.get('practice_level', 1)   # Agricultural Base Factor (1-10)
    
    # For this engine, we assume n=1 and r=1 for standardization
    # C(a) = (n * x) + 1  => (1 * x) + 1
    Ca = (1 * x) + 1
    
    # Calculate m(t) - Sustainable Time Constant
    # Avoid division by zero if S is not provided or is 0
    if S == 0:
        m = 0
    else:
        m = math.sqrt((Dn * In * Ca) / S)

    # 3. Disseminate Quality Tag
    quality_tag = ""
    if m > 15:
        quality_tag = "PREMIUM_VERIFIED"
    elif m > 8:
        quality_tag = "STANDARD_VERIFIED"
    else:
        quality_tag = "UNVERIFIED_DRAFT"

    # 4. Commit to Database Registry
    thrust_category = determine_thrust(raw_data)
    
    registry_entry = {
        "data": raw_data,
        "source": source_metadata,
        "quality_tag": quality_tag,
        "sustainability_score": round(m, 2),
        "thrust_category": thrust_category,
        "processed_at": math.floor(time.time())
    }
    
    return db_registry.commit(registry_entry)
