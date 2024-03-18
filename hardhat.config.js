
const POLYGON_API= process.env.POLYGON_API

const PRIVATE_KEY = 
"26538c6ee8793e8d3418b2f8cd1bb9faec80c1528a1463c0d8933e9af0cb6053";
const PRIVATE_KEY_zkEVM="26538c6ee8793e8d3418b2f8cd1bb9faec80c1528a1463c0d8933e9af0cb6053";


require("@nomiclabs/hardhat-waffle");
require('dotenv').config()
require("hardhat-gas-reporter");

module.exports = {
  defaultNetwork: "localhost",
  networks: {
    hardhat: {
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    polygon_mumbai: {
      chainId: 80001,
      url: "https://polygon-mumbai.g.alchemy.com/v2/D2o-5QybUzdBXOTruuMk4O-MY1kNqsLa",
      accounts: [`0x${PRIVATE_KEY}`],
    },
    zkEVM_Testnet: {
      chainId: 1442,
      url: "https://polygonzkevm-testnet.g.alchemy.com/v2/O4Npg6avRYqqhSHpDNf33bPgQBf9UFZR",
      accounts: [`0x${PRIVATE_KEY_zkEVM}`],
    },
  },
  solidity: {
    version: '0.8.11',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./src/contracts",
    artifacts: "./src/abis"
  },
  mocha: {
    timeout: 40000
  },
  gasReporter:{
    enabled:true,
    currency: "USD",
    // outputFile: "gas-report.txt",
    noColors: true,
    polygonapi:POLYGON_API
  }
}