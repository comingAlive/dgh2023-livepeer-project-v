import { ethers } from "ethers";

const fetchMyTokenBalance = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    "0x4D5D3FaE9b08a4FA2aEB9Bc0d86E3dB3b3126438",
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
