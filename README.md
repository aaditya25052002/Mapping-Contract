# Ethereum Token Mapping with ERC20 and ERC721

This project demonstrates how to create a mapping between ERC721 tokens and ERC20 tokens using Solidity and Hardhat. Each ERC721 token is associated with 1000 ERC20 tokens.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) 12.22.3 or higher
- [npm](https://www.npmjs.com/get-npm) 6.14.13 or higher

## Setup

1. Clone the repository:

```bash
git clone <repo-url>
cd <repo-name>
```

2. Install the required dependencies:

```bash
npm install
```

3. Create a new file `.env` and add your [Alchemy](https://alchemyapi.io/) API key and a private key of your Ethereum wallet (Do not share this with anyone):

```env
API_URL="https://eth-mainnet.alchemyapi.io/v2/YOUR_ALCHEMY_KEY"
PRIVATE_KEY="YOUR_PRIVATE_KEY"
```

For test networks like Rinkeby, Kovan, etc., the `API_URL` should be changed accordingly.

4. Compile the smart contracts:

```bash
npx hardhat compile
```

## Running Tests

Before running tests, start the local Hardhat network:

```bash
npx hardhat node
```

To run tests:

```bash
npx hardhat test
```

## Deployment

To deploy the contracts to the Mumbai testnet, run:

```bash
npx hardhat run scripts/deploy.js --network mumbai
```

Remember to update the `hardhat.config.js` with the correct network configuration.

## Smart Contracts

The smart contracts included in this project are:

- `ERC20Token.sol`: An ERC20 token contract.
- `ERC721Token.sol`: An ERC721 token contract.
- `TokenMapping.sol`: A contract that creates a mapping between ERC721 and ERC20 tokens.

## Tests

The test suite covers the following scenarios:

1. Creating a new token and its mapping correctly.
2. Preventing the reuse of the same ERC721 token ID.
3. Allowing only the contract owner to mint new tokens and create mappings.
4. Allowing the owner to transfer ERC721 tokens to another address.
5. Updating ERC20 balance upon ERC721 transfer.

## Notes

- This project is for demonstration and learning purposes only. It does not include many features of a production-ready contract (like a proper access control mechanism, pausability, upgradability, etc.)
- Always remember to adequately test smart contracts and get them audited by professionals before using them in production.
