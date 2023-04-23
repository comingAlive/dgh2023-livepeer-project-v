import { motion, useIsPresent } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import RecsGallery from "@/components/RecsGallery";
import { useAtom } from "jotai";
import { selectedCardAtom } from "@/lib/jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import fetchMyTokenBalance from "@/lib/fetchMyTokenBalance";
import { supabase } from "@/lib/supabaseClient";

import dao1Png from "../public/daos/dao_1.png";
import dao2Png from "../public/daos/dao_2.png";
import dao3Png from "../public/daos/dao_3.png";
import dao4Png from "../public/daos/dao_4.png";
import dao5Png from "../public/daos/dao_5.png";

const Card = ({
  title,
  desc = "<None>",
  date = "-",
  imageSrc,
  isJoined = false,
  joinFunc,
  i,
}) => {
  const [selectedCard, selectCard] = useAtom(selectedCardAtom);

  const router = useRouter();
  const isSelected = selectedCard === title;

  const [dateP, setDateP] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const getData = async () => {
      const r = await supabase.from("daomotion_daoexample_videos").select();
      if (r.data.at(0) && i === 0) {
        setDateP(r.data[0]["created_at"]);
        setLastName(r.data[0]["name"]);
      }
    };

    if (!dateP) {
      getData();
    }
  }, []);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  return (
    <div
      className={`w-96 shadow-xl card bg-base-100 transition border-4 ${
        isSelected && "border-primary"
      }`}
    >
      <figure>
        <Image
          placeholder="blur"
          className="!h-52"
          height={10}
          width={400}
          src={imageSrc}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h3>{title}</h3>
        <h3 className="card-title">Last Video:</h3>
        <p>{lastName.split(".")[0] || desc}</p>
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
        {dateP && i === 0 && (
          <div>
            Date:{" "}
            <span className="text-sm">
              {" "}
              {new Date(dateP).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </span>
          </div>
        )}
        {!dateP && i === 0 && <div>Date: {date === "" ? "-" : date}</div>}
        {i > 0 && <div>Date: {date === "" ? "-" : date}</div>}
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
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
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

    fetchMyTokenBalance().then((balance) => {
      if (Number(balance) > 0) {
        setIsJoinedDaoExample(true);
      }
    });
  };

  const [isJoinedDaoExample, setIsJoinedDaoExample] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.listAccounts().then((v) => {
      v.length &&
        fetchMyTokenBalance().then((balance) => {
          if (Number(balance) > 0) {
            setIsJoinedDaoExample(true);
          }
        });
    });
  }, []);

  // fetch MyToken contract balanceOf

  const cardsArr = [
    {
      title: "DAO Example",
      imageSrc: dao1Png,
      joinFunc: mint,
      isJoined: isJoinedDaoExample,
    },
    {
      title: "DYDX",
      imageSrc: dao2Png,
    },
    {
      title: "AAVE",
      imageSrc: dao3Png,
    },
    {
      title: "Arbitrum",
      imageSrc: dao4Png,
    },
    {
      title: "Optimism",
      imageSrc: dao5Png,
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
          joined
        </button>
        <button
          onClick={() => setIsShowAll(true)}
          className={`btn ${isShowAll ? "btn-active" : "btn-outline"} `}
        >
          Show all
        </button>
      </div>
      <div className="mt-12 gap-2 grid grid-cols-4 items-center justify-center px-32">
        {cardsArr
          .filter((c) => (isShowAll ? c : c?.isJoined))
          .map((c, i) => {
            return (
              <Card
                isJoined={c.isJoined}
                joinFunc={mint}
                key={c.title + i}
                i={i}
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
