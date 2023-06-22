const { expect } = require("chai");

describe("TokenMapping contract", function() {
  it("Should create a new token and its mapping correctly", async function() {
    const [owner] = await ethers.getSigners();

    // Deploy ERC20 token
    const ERC20Token = await ethers.getContractFactory("ERC20Token");
    const erc20 = await ERC20Token.deploy(1000000); // deploy with initial supply
    await erc20.deployed();

    // Deploy ERC721 token
    const ERC721Token = await ethers.getContractFactory("ERC721Token");
    const erc721 = await ERC721Token.deploy("TestToken", "TT");
    await erc721.deployed();

    // Deploy TokenMapping
    const TokenMapping = await ethers.getContractFactory("TokenMapping");
    const tokenMapping = await TokenMapping.deploy(erc721.address, erc20.address);
    await tokenMapping.deployed();

    // Create token and its mapping
    await tokenMapping.createTokenAndMapping(owner.address, 1);
    const erc20Amount = await tokenMapping.getERC20Amount(1);

    expect(erc20Amount).to.equal(1000);
  });
});

