// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import { Base64 } from "./libraries/Base64.sol";

/// @custom:security-contact 0xgeeb@gmail.com or @0xgeeb on twitter or 0xgeeb#6249 on discord
contract CTBPass is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  constructor() ERC721 ("Cook the Books Pass", "CTBP") {
    console.log("hello gypsy i am constructor yes");
  }

  function mintTheMFPass() public {
    uint256 newTokenId = _tokenIds.current();
    _safeMint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, "https://jsonkeeper.com/b/NF0W");
    _tokenIds.increment();
  }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
  {
    return super.tokenURI(tokenId);
  }
}