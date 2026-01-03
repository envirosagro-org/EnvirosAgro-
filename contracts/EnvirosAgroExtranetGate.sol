// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EnvirosAgroExtranetGate {
    
    struct PartnerAccess {
        bool isAuthorized;
        uint256 contractExpiry;
        string integrationType; // "ERP_LINK", "CLOUD_EMBED", "API"
    }

    mapping(address => PartnerAccess) public partners;
    uint256 public accessCost = 1000 * 10**18; // 1000 Tokenz
    event AccessGranted(address indexed partner, uint256 timestamp);

    // 1. PAYMENT & CONTRACT EXECUTION
    function payForDataIngest(string memory _integrationType) public payable {
        // Partner must pay in EnvirosAgro Tokenz
        require(msg.value >= accessCost, "Insufficient Tokenz for Ingest Access");

        // 2. AUTOMATION: Unlock the Gate
        partners[msg.sender] = PartnerAccess({
            isAuthorized: true,
            contractExpiry: block.timestamp + 30 days, // Monthly License
            integrationType: _integrationType
        });

        emit AccessGranted(msg.sender, block.timestamp);
    }

    // 3. INGEST VALIDATION (Called by the API)
    function validateIngest(address _partner) public view returns (bool) {
        if (!partners[_partner].isAuthorized) return false;
        if (block.timestamp > partners[_partner].contractExpiry) return false;
        return true;
    }
}