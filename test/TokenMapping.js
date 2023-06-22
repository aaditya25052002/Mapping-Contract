const { expect } = require("chai");

describe("TokenMapping contract", function() {
  let ERC20Token, ERC721Token, TokenMapping, owner, addr1;
  let erc20, erc721, tokenMapping;

  beforeEach(async function() {
    [owner, addr1] = await ethers.getSigners();

    // Deploy ERC20 token
    ERC20Token = await ethers.getContractFactory("ERC20Token");
    erc20 = await ERC20Token.deploy(1000000); // deploy with initial supply
    await erc20.deployed();

    // Deploy ERC721 token
    ERC721Token = await ethers.getContractFactory("ERC721Token");
    erc721 = await ERC721Token.deploy("TestToken", "TT");
    await erc721.deployed();

    // Deploy TokenMapping
    TokenMapping = await ethers.getContractFactory("TokenMapping");
    tokenMapping = await TokenMapping.deploy(erc721.address, erc20.address);
    await tokenMapping.deployed();
  });

  it("Should create a new token and its mapping correctly", async function() {
    // Create token and its mapping
    await tokenMapping.createTokenAndMapping(owner.address, 1);
    const erc20Amount = await tokenMapping.getERC20Amount(1);
    expect(erc20Amount).to.equal(1000);
  });

  it("Should fail if the same ERC721 token id is used", async function() {
    await tokenMapping.createTokenAndMapping(owner.address, 1);

    // The second time we try to create a mapping with the same id, it should fail
    await expect(tokenMapping.createTokenAndMapping(owner.address, 1)).to.be.revertedWith("ERC721: token already minted");
  });

  it("Should fail if a non-owner tries to create a mapping", async function() {
    await expect(tokenMapping.connect(addr1).createTokenAndMapping(addr1.address, 1)).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Should allow owner to transfer ERC721 token", async function() {
    await tokenMapping.createTokenAndMapping(owner.address, 1);

    await erc721.transferFrom(owner.address, addr1.address, 1);
    const newOwner = await erc721.ownerOf(1);
    expect(newOwner).to.equal(addr1.address);
  });

  it("Should update ERC20 amount upon ERC721 transfer", async function() {
    await tokenMapping.createTokenAndMapping(owner.address, 1);

    // Check initial ERC20 balance of addr1
    let addr1Balance = await erc20.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(0);

    // Transfer ERC721 token to addr1
    await erc721.transferFrom(owner.address, addr1.address, 1);

    // Check updated ERC20 balance of addr1
    addr1Balance = await erc20.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(1000);
  });
});


