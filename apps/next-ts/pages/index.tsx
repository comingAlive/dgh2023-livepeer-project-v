import { motion, useIsPresent } from "framer-motion";
import Link from "next/link";
import RecsGallery from "@/components/RecsGallery";
import { useAtom } from "jotai";
import { selectedCardAtom } from "@/lib/jotai";
import { useRouter } from "next/router";
import { useState } from "react";

const cardsArr = [
  {
    title: "DYDX",
    desc: "If a dog chews shoes whose shoes does he choose?",
    imageSrc: "https://dydx.exchange/og-image.png",
    isJoined: true,
  },
  {
    title: "AAVE",
    desc: "If a dog chews shoes whose shoes does he choose?",
    imageSrc: "https://cryptokopen.nl/wp-content/uploads/2021/03/aave.jpg",
  },
  {
    title: "Arbitrum",
    desc: "If a dog chews shoes whose shoes does he choose?",
    imageSrc:
      "https://www.tbstat.com/wp/uploads/2023/03/20230315_Arbitrum_airdrop-1200x675.jpg",
  },
  {
    title: "Optimism",
    desc: "If a dog chews shoes whose shoes does he choose?",
    imageSrc: "https://crypto.news/app/uploads/2022/04/Optimism.jpg",
  },
];

const Card = ({title, desc, imageSrc, isJoined = false}) => {
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
                router.push("/amsterdam");
              }}
              className={`btn btn-primary  ${isSelected ? "" : "btn-outline"}`}
            >
              {isSelected ? "Loading..." : "Watch Videos"}
            </button>
          )}
          <button
            className={`btn btn-primary  ${isJoined ? "" : "btn-outline"}`}
          >
            {isJoined ? "Joined" : "Join"}
          </button>
        </div>
        <div>Date: 23.01.24</div>
      </div>
    </div>
  );
};

export default function Home() {
  const isPresent = useIsPresent();

  const [isShowAll, setIsShowAll] = useState(true);

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
        {cardsArr.filter((c) => isShowAll ? c : c.isJoined).map((c, i) => {
          return <Card key={c.title + i} {...c} />;
        })}
      </div>
      <div className="divider"></div>
      <div className="flex justify-center items-center">
        <ul className="z-20 mx-auto">
          <li className="text-4xl">
            <Link href="/amsterdam">Show Random Featuring Video</Link>
          </li>
          <li className="text-center">
            <Link href="/london">Advertising Purposes</Link>
          </li>
        </ul>
      </div>
      <motion.div
        initial={{scaleX: 1}}
        animate={{scaleX: 0, transition: {duration: 0.5, ease: "circOut"}}}
        exit={{scaleX: 1, transition: {duration: 0.5, ease: "circIn"}}}
        style={{originX: isPresent ? 0 : 1}}
        className="privacy-screen"
      />
      <RecsGallery />
    </article>
  );
}
