import { motion, useIsPresent, useScroll, useSpring } from "framer-motion";
import { Video } from "./Video";
import Link from "next/link"

interface Props {
  alt: string;
  title: string;
  titleWidth: number;
  videos: any[];
}

export function Gallery({ alt, title, titleWidth, videos }: Props) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const isPresent = useIsPresent();

  return (
    <article>
      <button className="btn btn-outline z-10 sticky top-20 left-20">Upload</button>
      <h1 style={{ "--base-width": `${titleWidth}vw`, x: "-50%" } as any}>
        {title}
      </h1>
      {videos.map(({name, playbackId}, index) => (
        <Video
          name={name}
          playbackId={playbackId}
          index={index + 1}
          alt={alt}
          key={index}
          aspectRatio={"1.78"}
        />
      ))}
      <motion.div className="progress" style={{ scaleX }} />
      <footer className="back">
        <Link href="/">Back to galleries</Link>
      </footer>
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
