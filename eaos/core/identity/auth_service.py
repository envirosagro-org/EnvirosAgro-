
# ===================================================================================
# EnvirosAgro Operating System (EAOS)
# Core Service: Identity & Authentication
# Description: This service handles all user registration, login, and session
#              management for the entire EnvirosAgro ecosystem. It is designed
#              to be the single source of truth for user identity.
# ===================================================================================

# This service would use a robust cryptography library like passlib or bcrypt.
# For this example, we'll simulate hashing for clarity.
import hashlib
import os
import datetime

# This would be a secure, randomly generated secret key stored in environment variables.
JWT_SECRET_KEY = os.environ.get("EAOS_SECRET_KEY", "default-super-secret-key")

class AuthService:
    """
    Manages all user authentication and authorization logic.
    In a real microservices architecture, this could be a standalone service.
    """

    def __init__(self, db_registry_service):
        """
        Initializes the AuthService with a connection to the database registry.
        This uses dependency injection, making the system more modular and testable.
        """
        self.db = db_registry_service
        print("[EAOS_Identity] Authentication Service Initialized.")

    def _hash_password(self, password: str) -> str:
        """Hashes a password using SHA256. In production, use bcrypt or Argon2."""
        return hashlib.sha256(password.encode()).hexdigest()

    def _generate_jwt(self, user_id: str) -> str:
        """
        Generates a simplified JWT-like token.
        In production, use a library like PyJWT to create a standard, secure JWT.
        """
        # Header (static for this example)
        header = "alg:HS256,typ:JWT"
        
        # Payload
        payload = f'"user_id":"{user_id}","exp":{int(datetime.datetime.utcnow().timestamp()) + 86400}' # 24-hour expiry
        
        # Signature
        signature = hashlib.sha256(f'{header}.{payload}.{JWT_SECRET_KEY}'.encode()).hexdigest()
        
        return f'{header}.{payload}.{signature}'

    def register_user(self, email: str, password: str) -> dict:
        """
        Registers a new user, hashes their password, and creates a user record.
        """
        print(f"[EAOS_Identity] Attempting to register user: {email}")
        
        existing_user = self.db.find_one("users", {"email": email})
        if existing_user:
            raise ValueError("User with this email already exists.")

        hashed_password = self._hash_password(password)
        
        # The initial user profile, including the starting 'm-score' for the mining algorithm
        new_user_data = {
            "email": email,
            "password_hash": hashed_password,
            "created_at": datetime.datetime.utcnow(),
            "sustainability_profile": {
                "m": 1.0, # Start all users with a base m-score of 1
                "thrust_history": []
            },
            "wallet": {
                "balance": 0,
                "lifetime": 0
            }
        }
        
        user_record = self.db.insert_one("users", new_user_data)
        print(f"[EAOS_Identity] User {email} registered successfully.")
        return user_record

    def login_user(self, email: str, password: str) -> str:
        """
        Logs a user in by verifying their password and issuing a JWT.
        """
        print(f"[EAOS_Identity] Attempting to log in user: {email}")
        user = self.db.find_one("users", {"email": email})
        
        if not user:
            raise ValueError("Invalid credentials.")

        if user["password_hash"] != self._hash_password(password):
            raise ValueError("Invalid credentials.")

        token = self._generate_jwt(user["_id"])
        print(f"[EAOS_Identity] Login successful for {email}. Token issued.")
        return token
        
    def verify_token(self, token: str) -> dict:
        """
        Verifies a token's integrity and signature.
        This would be used as middleware to protect secure routes.
        """
        try:
            header, payload, signature = token.split('.')
            expected_signature = hashlib.sha256(f'{header}.{payload}.{JWT_SECRET_KEY}'.encode()).hexdigest()

            if signature != expected_signature:
                raise ValueError("Invalid token signature.")
            
            # In a real app, you would parse the payload as JSON
            # and check the 'exp' (expiration) claim.
            
            print(f"[EAOS_Identity] Token verified successfully.")
            return {"is_valid": True, "payload": payload}
        except Exception as e:
            print(f"[EAOS_Identity] Token verification failed: {e}")
            raise ValueError("Invalid token.")

