import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Player } from "@livepeer/react";

function useParallax(value: MotionValue<number>, distance: string) {
  return useTransform(value, [0, 1], ["-" + distance, distance]);
}

interface Props {
  alt: string;
  index: number;
  aspectRatio: string;
  name: string;
  playbackId: string;
}

export function Video({ alt, name, playbackId, aspectRatio, index }: Props) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, "50vh");

  return (
    <section>
      <div ref={ref} style={{ aspectRatio }}>
        <Player accessKey="123" title={name} playbackId={playbackId} />
        {/*<img className="img" src={`/${category}-${index}.jpg`} alt={alt} />*/}
      </div>
      <motion.h2 className="z-10" style={{ y }}>{`#00${index}`}</motion.h2>
    </section>
  );
}
