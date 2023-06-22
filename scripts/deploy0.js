const { ethers } = require("hardhat");
async function main() {
  // const [deployer] = await ethers.getSigners();

  // console.log("Deploying contracts with the account:", deployer.address);

  const ERC20 = await ethers.getContractFactory("ERC20Token");
  const ERC721 = await ethers.getContractFactory("ERC721Token");
  const ERC20Instance = await ERC20.deploy(1000000);
  await ERC20Instance.deployed();

  const ERC721Instance = await ERC721.deploy("ERC721Token", "TOKEN");
  await ERC721Instance.deployed();

  const TokenMapping = await ethers.getContractFactory("TokenMapping");
  const mappingInstance = await TokenMapping.deploy(
    ERC721Instance.address,
    ERC20Instance.address
  );
  await mappingInstance.deployed();

  console.log("ERC20 deployed to:", ERC20Instance.address);
  console.log("ERC721 deployed to:", ERC721Instance.address);
  console.log("TokenMapping deployed to:", mappingInstance.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
