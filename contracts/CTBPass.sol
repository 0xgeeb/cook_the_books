// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import { Base64 } from "./libraries/Base64.sol";

/// @custom:security-contact 0xgeeb@gmail.com or @0xgeeb on twitter or 0xgeeb#6249 on discord
contract CTBPass is ERC721URIStorage, Ownable {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  uint256 MINT_LIMIT = 10;
  uint256 OG_LIMIT = 2;

  event NewPassMinted(address sender, uint256 tokenId);

  constructor() ERC721 ("Cook the Books Pass", "CTBP") {
    _tokenIds.increment();
  }

  function mintTheMFPass() public {
    uint256 newTokenId = _tokenIds.current();
    require(newTokenId <= MINT_LIMIT, "passes are sold out sorry bro");
    _safeMint(msg.sender, newTokenId);
    if (newTokenId <= OG_LIMIT) {
      _setTokenURI(newTokenId, "OG_PLACEHOLDER");
      console.log('just minted og pass');
    }
    else {
      _setTokenURI(newTokenId, "PLACEHOLDER");
      console.log('just minted regular pass');
    }
    _tokenIds.increment();
    emit NewPassMinted(msg.sender, newTokenId);
  }

}