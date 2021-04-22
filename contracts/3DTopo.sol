// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


//@dev: sets up OpenZeppelin lirbaries needed for an NFT
//@dev: plus additional libraries needed for pause and access control
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract TopoToken3D is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, AccessControl, ERC721Burnable {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

//@dev: sets up three roles: admin, pauser (for security) and minter
    constructor() ERC721("TopoToken3D", "TOPO") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(PAUSER_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
    }

//@dev: pauses the contract in case of an emergency
    function pause() public {
        require(hasRole(PAUSER_ROLE, msg.sender));
        _pause();
    }

//@dev: unpauses a paused contract
    function unpause() public {
        require(hasRole(PAUSER_ROLE, msg.sender));
        _unpause();
    }

//@dev:mints the NFT
    function safeMint(address to, uint256 tokenId) public {
        require(hasRole(MINTER_ROLE, msg.sender));
        _safeMint(to, tokenId);
    }

//@dev: sets up the baseURI for minting- in our case connect this with the Skale Storage
    function _baseURI() internal pure override returns (string memory) {
        return "'INSERT SKALE STORAGE'";
    }

//@dev:override ERC721, ERC721Enumerable before Token Transfer
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

//@dev: burn a token with a parrticular Id.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

//@dev: find the tokenURI fo a particular token ID
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

//@dev: supports a particular interface
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
