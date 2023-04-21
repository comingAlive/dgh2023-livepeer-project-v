import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Player } from "@livepeer/react";
import { supabase } from "@/lib/supabaseClient";
import fetchMyTokenBalance from "@/lib/fetchMyTokenBalance";

function useParallax(value: MotionValue<number>, distance: string) {
  return useTransform(value, [0, 1], ["-" + distance, distance]);
}

interface Props {
  alt: string;
  index: number;
  aspectRatio: string;
  name: string;
  playbackId: string;
  setVideos: any;
}

export function Video({
  name,
  playbackId,
  aspectRatio,
  index,
  setVideos,
}: Props) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, "50vh");

  return (
    <motion.section
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative rounded-xl" ref={ref} style={{ aspectRatio }}>
        <div className="absolute z-50 flex w-full items-center justify-between px-4 text-white text-[10px]">
          <div></div>
          <div className="flex pt-4 items-center justify-center gap-2">
            <div>Date: 08.02.2023</div>
            <div
              onClick={async () => {
                await supabase
                  .from("daomotion_daoexample_videos")
                  .delete()
                  .match({ playbackId });
                const r = await supabase
                  .from("daomotion_daoexample_videos")
                  .select();
                r.data && setVideos(r.data);
              }}
              className="cursor-pointer text-error"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <Player accessKey="123" title={name} playbackId={playbackId} />
        {/*<img className="img" src={`/${category}-${index}.jpg`} alt={alt} />*/}
        <div className="z-10 text-5xl text-white">hgi</div>
      </div>
      <motion.h2 className="z-10" style={{ y }}>{`#00${index}`}</motion.h2>
    </motion.section>
  );
}
