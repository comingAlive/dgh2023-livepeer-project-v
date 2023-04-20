import { ethers } from "hardhat";
import { DAO__factory, MyToken__factory } from "../../next-ts/typechain";

async function main() {
  const MyToken__factory = (await ethers.getContractFactory(
    "MyToken"
  )) as MyToken__factory;

  const c = await MyToken__factory.deploy("1");
  const myTokenAddress = (await c.deployed()).address;
  console.log(myTokenAddress);

  const DAO__factory = (await ethers.getContractFactory("DAO")) as DAO__factory;

  const d = await DAO__factory.deploy(myTokenAddress);
  const daoAddress = (await d.deployed()).address;
  console.log(daoAddress);

  const etherAmount = "100";
  const signers = await ethers.getSigners();

  await signers[0].sendTransaction({
    to: process.env.PUBLIC_ADDRESS,
    value: ethers.utils.parseEther(etherAmount),
  });
  await signers[1].sendTransaction({
    to: "0xf60d6EDA5a76dD81F0c0Ef236D09da0e1e0a0353",
    value: ethers.utils.parseEther(etherAmount),
  });
  await signers[2].sendTransaction({
    to: "0x314FEB24Ca56d847644a490e57762446b30C2d3F",
    value: ethers.utils.parseEther(etherAmount),
  });
  await signers[3].sendTransaction({
    to: "0x3314b668549cd8251B224DeD955C7B632a4453B2",
    value: ethers.utils.parseEther(etherAmount),
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
