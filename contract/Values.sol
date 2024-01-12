// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Values is ERC721URIStorage {
    uint256 private _nextTokenId;

    string public metadataURI = 'ipfs://bafkreiemv5pxpt4ladnnd3xf5gckufywhnc5vijsmsa2tceu3xit7fx6xi';

    constructor() ERC721('Values', 'VALUE') {}

    function mint() 
        public 
        returns (uint256)
    {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, metadataURI);

        return tokenId;
    }
}