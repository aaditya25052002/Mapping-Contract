// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Token.sol";
import "./ERC20Token.sol";

contract TokenMapping {
    ERC721Token private erc721Token;
    ERC20Token private erc20Token;

    mapping(uint256 => uint256) private erc721toErc20;

    event MappingCreated(uint256 indexed erc721Id, uint256 erc20Amount);

    constructor(address _erc721Token, address _erc20Token) {
        erc721Token = ERC721Token(_erc721Token);
        erc20Token = ERC20Token(_erc20Token);
    }

    function createTokenAndMapping(address to, uint256 erc721Id) public {
        erc721Token.mint(to, erc721Id);
        erc20Token.mint(to, 1000);
        erc721toErc20[erc721Id] = 1000;

        emit MappingCreated(erc721Id, 1000);
    }

    function getERC20Amount(uint256 erc721Id) public view returns (uint256) {
        return erc721toErc20[erc721Id];
    }
}
