import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import { config as dotEnvConfig } from "dotenv";
import "hardhat-contract-sizer";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from "hardhat/types";

dotEnvConfig();

const config: HardhatUserConfig = {
  // defaultNetwork: "mumbai",
  defaultNetwork: "localhost",
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
            details: {
              yul: true,
              yulDetails: {
                stackAllocation: true,
                optimizerSteps: "dhfoDgvulfnTUtnIf",
              },
            },
          },
        },
      },
    ],
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: "USD",
    token: "AVAX",
    gasPriceApi:
      "https://api.snowtrace.io/api?module=proxy&action=eth_gasPrice",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  networks: {
    // hardhat: {
    //   forking: {
    //     url: process.env.RPC_URL,
    //     enabled: false,
    //   },
    // },
    // mumbai: {
    //   url: "https://matic-mumbai.chainstacklabs.com",
    //   // accounts: [process.env.PRIVATE_KEY],
    //   gasPrice: "auto",
    // },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
};

export default config;
