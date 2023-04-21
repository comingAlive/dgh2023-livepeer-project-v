import { ethers } from "ethers";

const fetchMyTokenBalance = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    [
      "function mint(uint256 amount) public",
      "function balanceOf(address owner) public view returns (uint256)",
    ],
    signer
  );
  const balance = await contract.balanceOf(signer.getAddress());
  console.log("Balance: " + balance);
  return balance;
};
export default fetchMyTokenBalance;
