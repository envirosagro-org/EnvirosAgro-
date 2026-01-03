import { ethers } from "hardhat";

async function main() {
  const EnvirosAgroCoin = await ethers.getContractFactory("EnvirosAgroCoin");
  const envirosAgroCoin = await EnvirosAgroCoin.deploy();

  await envirosAgroCoin.deployed();

  console.log(`EnvirosAgroCoin deployed to ${envirosAgroCoin.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
