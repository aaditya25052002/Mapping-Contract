require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

/** @type import('hardhat/config').HardhatUserConfig */


const PRIVATE_KEY = process.env.PRIVATE_KEY;
const MUMBAI_HTTP_URL = process.env.MUMBAI_HTTP_URL;


module.exports = {
  solidity: "0.8.18",
  networks: {
    mumbai: {
      url: MUMBAI_HTTP_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
