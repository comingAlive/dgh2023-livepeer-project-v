import { motion, useIsPresent } from "framer-motion";
import Link from "next/link";
import RecsGallery from "@/components/RecsGallery";
import { useAtom } from "jotai";
import { selectedCardAtom } from "@/lib/jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import fetchMyTokenBalance from "@/lib/fetchMyTokenBalance";

const Card = ({
  title,
  desc = "<None>",
  date = "-",
  imageSrc,
  isJoined = false,
  joinFunc,
}) => {
  const [selectedCard, selectCard] = useAtom(selectedCardAtom);

  const router = useRouter();
  const isSelected = selectedCard === title;

  return (
    <div
      className={`w-96 shadow-xl card bg-base-100 transition border-4 ${
        isSelected && "border-primary"
      }`}
    >
      <figure>
        <img className="h-56" src={imageSrc} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h3>{title}</h3>
        <h3 className="card-title">Last Video:</h3>
        <p>{desc}</p>
        <div className="justify-end card-actions">
          {isJoined && (
            <button
              onClick={() => {
                selectCard(isSelected ? null : title);
                router.push("/daoexample");
              }}
              className={`btn btn-primary  ${isSelected ? "" : "btn-outline"}`}
            >
              {isSelected ? "Loading..." : "Watch Videos"}
            </button>
          )}
          <button
            onClick={joinFunc}
            className={`btn btn-primary  ${isJoined ? "" : "btn-outline"}`}
          >
            {isJoined ? "Joined" : "Join"}
          </button>
        </div>
        <div>Date: {date === "" ? "-" : date}</div>
      </div>
    </div>
  );
};

export default function Home() {
  const isPresent = useIsPresent();

  const [isShowAll, setIsShowAll] = useState(true);

  const mint = async () => {
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
    const tx = await contract.mint(1);
    await tx.wait();
    const balance = await contract.balanceOf(signer.getAddress());
    console.log("Minted 1 tokens. Balance: " + balance);
  };

  const [isJoinedDaoExample, setIsJoinedDaoExample] = useState(false);

  useEffect(() => {
    fetchMyTokenBalance().then((balance) => {
      if (Number(balance) > 0) {
        setIsJoinedDaoExample(true);
      }
    });
  }, []);

  // fetch MyToken contract balanceOf

  const cardsArr = [
    {
      title: "DAO Example",
      imageSrc:
        "https://crypto.news/app/uploads/2022/02/Crypto_Enthusiasts_Forming_DAO_to_Buy_Denver_Broncos_NFL_Team.jpg",
      joinFunc: mint,
      isJoined: isJoinedDaoExample,
    },
    {
      title: "DYDX",
      imageSrc: "https://dydx.exchange/og-image.png",
    },
    {
      title: "AAVE",
      imageSrc: "https://cryptokopen.nl/wp-content/uploads/2021/03/aave.jpg",
    },
    {
      title: "Arbitrum",
      imageSrc:
        "https://www.tbstat.com/wp/uploads/2023/03/20230315_Arbitrum_airdrop-1200x675.jpg",
    },
    {
      title: "Optimism",
      imageSrc: "https://crypto.news/app/uploads/2022/04/Optimism.jpg",
    },
  ];

  // use typechain to execute mint from this contract:
  // contract MyToken is ERC20 {
  //     constructor(uint256 initialSupply) ERC20("My Token", "ERC20CLUB") {
  //         _mint(msg.sender, initialSupply);
  //     }
  //     // solidity function to mint tokens to msg.owner
  //     function mint(uint256 amount) public {
  //         _mint(msg.sender, amount);
  //     }
  // }

  return (
    <article>
      {/*<Header />*/}
      <h1
        className="pt-20 tracking-[-0.9vw]"
        style={
          {
            // "--base-width": "24vw",
            // top: "-18vw",
            // letterSpacing: "-1.4vw",
            // x: "-50%",
          } as any
        }
      >
        DAO Motion
      </h1>
      <div className="btn-group mt-28 flex justify-center">
        <button
          onClick={() => setIsShowAll(false)}
          className={`btn ${isShowAll ? "btn-outline" : "btn-active"} `}
        >
          Only joined
        </button>
        <button
          onClick={() => setIsShowAll(true)}
          className={`btn ${isShowAll ? "btn-active" : "btn-outline"} `}
        >
          Show all
        </button>
      </div>
      <div className="mt-12 grid grid-cols-4 items-center justify-center px-32">
        {cardsArr
          .filter((c) => (isShowAll ? c : c?.isJoined))
          .map((c, i) => {
            return (
              <Card
                isJoined={c.isJoined}
                joinFunc={mint}
                key={c.title + i}
                {...c}
              />
            );
          })}
      </div>
      <div className="divider"></div>
      <div className="flex justify-center items-center">
        <ul className="z-20 mx-auto mt-20">
          <li className="text-4xl mb-20">
            <Link href="/amsterdam"> Featuring</Link>
          </li>
        </ul>
      </div>
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      />
      <RecsGallery />
    </article>
  );
}
