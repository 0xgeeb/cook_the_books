// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


/// @custom:security-contact 0xgeeb@gmail.com or @0xgeeb on twitter or 0xgeeb#6249 on discord
contract CTBPass is ERC721URIStorage, Ownable {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  uint256 public constant MINT_LIMIT = 10;
  uint256 public constant OG_LIMIT = 2;

  // event NewPassMinted(address sender, uint256 tokenId);

  constructor() ERC721 ("Cook the Books Pass - test2", "CTBP") {
    _tokenIds.increment();
  }

  function mintTheMFPass() public {
    uint256 newTokenId = _tokenIds.current();
    require(newTokenId <= MINT_LIMIT, "passes are sold out sorry bro");
    _safeMint(msg.sender, newTokenId);
    if (newTokenId <= OG_LIMIT) {
      string memory ipfsJson = "ipfs://bafkreihjyhcqfz3544kjem55el3fa3whtfhoagl5ehcb564emsd3ocdy7q";
      _setTokenURI(newTokenId, ipfsJson);
    }
    else {
      string memory ipfsJson = "ipfs://bafkreia2pzmjzezcigtq6hlbnrm4qtoh7z4ulfrttelqufsadlt2vwhqw4";
      _setTokenURI(newTokenId, ipfsJson);
    }
    _tokenIds.increment();
    // emit NewPassMinted(msg.sender, newTokenId);
  }

}