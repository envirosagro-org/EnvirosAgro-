# ===================================================================================
# EnvirosAgro Operating System (EAOS)
# Core Service: Registry & State
# Description: This service is the exclusive gateway to the underlying database.
#              It abstracts all database logic, providing a clean and secure API
#              for other core services to use. No other service should ever
#              talk to the database directly.
# ===================================================================================

# In a real application, this would be the only place where the MongoDB
# driver (e.g., pymongo) is imported and used directly.

class MockMongoCollection:
    """A mock collection to simulate MongoDB interactions for this example."""
    def __init__(self, name):
        self.name = name
        self._documents = []
        self._id_counter = 0
        print(f"[EAOS_Registry] Mock collection '{self.name}' initialized.")

    def insert_one(self, document):
        self._id_counter += 1
        # Simulate MongoDB's ObjectId
        document['_id'] = f'mock_id_{self._id_counter}'
        self._documents.append(document)
        return document

    def find_one(self, query):
        key, value = list(query.items())[0]
        for doc in self._documents:
            if key in doc and doc[key] == value:
                return doc
        return None

class RegistryService:
    """
    Manages all state and interactions with the database.
    Provides a single, secure point of access to the application's data.
    """

    def __init__(self, connection_string: str):
        """
        Initializes the connection to the database.
        In a real app, this would establish a pymongo.MongoClient connection pool.
        """
        self.connection_string = connection_string
        self._collections = {
            "users": MockMongoCollection("users"),
            "registry": MockMongoCollection("registry"),
            "ledger": MockMongoCollection("ledger")
        }
        print(f"[EAOS_Registry] Registry Service Initialized. Connected to mock DB.")

    def find_one(self, collection_name: str, query: dict) -> dict:
        """
        Finds a single document in a specified collection.
        """
        if collection_name not in self._collections:
            raise ValueError(f"Collection '{collection_name}' does not exist.")
        print(f"[EAOS_Registry] Executing find_one on '{collection_name}' with query: {query}")
        return self._collections[collection_name].find_one(query)

    def insert_one(self, collection_name: str, document: dict) -> dict:
        """
        Inserts a single document into a specified collection.
        """
        if collection_name not in self._collections:
            raise ValueError(f"Collection '{collection_name}' does not exist.")
        print(f"[EAOS_Registry] Executing insert_one on '{collection_name}'.")
        return self._collections[collection_name].insert_one(document)

# --- Example of how this service would be used by other parts of the EAOS ---
#
# def some_other_service_function(registry: RegistryService):
#     user = registry.find_one("users", {"email": "some@user.com"})
#     if not user:
#         new_user = registry.insert_one("users", {"email": "some@user.com", "role": "farmer"})
