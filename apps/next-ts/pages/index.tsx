import { motion, useIsPresent } from "framer-motion";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
export default function Home() {
  const isPresent = useIsPresent();
  return (
    <article>
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
        LiveTube Pass
      </h1>
      <ul>
        <li>
          <Link href="/amsterdam">Amsterdam Zuid nightwalk</Link>
        </li>
        <li>
          <Link href="/london">White lines of Canary Wharf</Link>
        </li>
      </ul>
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      />
    </article>
  );
}
