//npx solcjs contracts/sbt.sol --abi --include-path ../node_modules/ --base-path ../node_modules/

const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const SBT = await hre.ethers.getContractFactory("SBT");
  const sbt = await SBT.deploy();
  // const SBT = await hre.ethers.getContractFactory("RestrictedERC20");
  // const sbt = await SBT.deploy("0x49c320c2fE782038277B9a185F1aE656F0E224cB");

  await sbt.deployed();
  console.log("SBT deployed to:", sbt.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
