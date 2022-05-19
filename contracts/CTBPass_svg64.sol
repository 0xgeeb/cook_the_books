// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";
import { Base64 } from "./libraries/Base64.sol";

/// @custom:security-contact 0xgeeb@gmail.com or @0xgeeb on twitter or 0xgeeb#6249 on discord
contract CTBPass_svg64 is ERC721URIStorage, Ownable {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  uint256 MINT_LIMIT = 10;
  uint256 OG_LIMIT = 2;

  // event NewPassMinted(address sender, uint256 tokenId);

  constructor() ERC721 ("Cook the Books Pass", "CTBP") {
    _tokenIds.increment();
  }

  function mintTheMFPass() public {
    uint256 newTokenId = _tokenIds.current();
    require(newTokenId <= MINT_LIMIT, "passes are sold out sorry bro");
    if (newTokenId <= OG_LIMIT) {
      _safeMint(msg.sender, newTokenId);
      string memory json = Base64.encode(
        bytes(
          string(
            abi.encodePacked(
            '{"name": "test ctb og pass", "description": "mf test run of the ctb pass.", "image": "ipfs://bafkreihzkohcdbcwpwqzpsiqjxakecgyosho3kjjf6iicimzp5r7z7tgja"}'
            )
          )
        )
      );
      string memory finalTokenUri = string(
        abi.encodePacked("data:application/json;base64,", json)
      );
      _setTokenURI(newTokenId, finalTokenUri);
    }
    else {
      _safeMint(msg.sender, newTokenId);
      string memory json = Base64.encode(
        bytes(
          string(
            abi.encodePacked(
            '{"name": "test ctb pass", "description": "mf test run of the ctb pass.", "image": "ipfs://bafkreiclcr4d55fs3me3aimnmt46zjjs22xmujxp6elkdnmmgaf53rpdcm"}'
            )
          )
        )
      );
      string memory finalTokenUri = string(
        abi.encodePacked("data:application/json;base64,", json)
      );
      _setTokenURI(newTokenId, finalTokenUri);
    }
    _tokenIds.increment();
    // emit NewPassMinted(msg.sender, newTokenId);
  }

}