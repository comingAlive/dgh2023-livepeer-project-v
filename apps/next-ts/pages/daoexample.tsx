import { useCallback, useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { selectedCardAtom } from "@/lib/jotai";
import { supabase } from "@/lib/supabaseClient";
import fetchMyTokenBalance from "@/lib/fetchMyTokenBalance";
import { Video } from "@/components/Video";
import { motion, useIsPresent, useScroll, useSpring } from "framer-motion";

import Link from "next/link";
import { useDropzone } from "react-dropzone";
import { useAssetMetrics, useCreateAsset } from "@livepeer/react";

const DaoExamplePage = () => {
  const [, selectCard] = useAtom(selectedCardAtom);
  useEffect(() => {
    selectCard("");
  }, []);

  useEffect(() => {
    const getVideos = async () => {
      const r = await supabase.from("daomotion_daoexample_videos").select();
      r.data && setVideos(r.data);
    };

    fetchMyTokenBalance().then((balance) => {
      if (Number(balance) > 0) {
        getVideos();
      }
    });
  }, []);

  const [videos, setVideos] = useState([]);

  const title = "DAO Example";
  const titleWidth = 8.2;
  const alt = "Example DAO";

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const isPresent = useIsPresent();

  const [video, setVideo] = useState<File | undefined>();

  const {
    mutate: createAsset,
    data: asset,
    status,
    progress,
    error,
  } = useCreateAsset(
    video
      ? {
          sources: [
            {
              name: video.name,
              file: video,
              playbackPolicy: {
                type: "webhook",
                // This is the id of the webhook you created in step 2
                webhookId: "07b6e894-5ac9-4161-a988-f753bc104bb1",
                webhookContext: {
                  // This is the context you want to pass to your webhook
                  // It can be anything you want, and it will be passed back to your webhook
                },
              },
            },
          ] as const,
        }
      : null
  );

  useEffect(() => {
    if (!asset) {
      return;
    }
    const handler = async () => {
      console.log(asset);
      setVideos([...videos, asset[0]]);
      await supabase.from("daomotion_daoexample_videos").insert({
        name: asset[0].name,
        playbackId: asset[0].playbackId,
      });
    };

    handler();
  }, [asset]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
      setVideo(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "video/*": [".mp4"],
    },
    maxFiles: 1,
    onDrop,
  });

  useEffect(() => {
    if (video) {
      createAsset?.();
    }
  }, [video]);

  const isLoading = useMemo(
    () =>
      status === "loading" ||
      (asset?.[0] && asset[0].status?.phase !== "ready"),
    [status, asset]
  );

  const { data: metrics } = useAssetMetrics({
    assetId: asset?.[0].id,
    refetchInterval: 30000,
  });

  const progressFormatted = useMemo(
    () =>
      progress?.[0].phase === "failed"
        ? "Failed to process video."
        : progress?.[0].phase === "waiting"
        ? "Waiting..."
        : progress?.[0].phase === "uploading"
        ? `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`
        : progress?.[0].phase === "processing"
        ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
        : null,
    [progress]
  );

  return (
    <article>
      <span className="sticky  pt-20 left-20 z-10 flex w-max flex-col items-center  gap-2 justify-center">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <button className="btn btn-outline w-40">Upload</button>
          <div className="flex justify-center mt-2 items-center">
            {progressFormatted && <p>{progressFormatted}</p>}
          </div>

          <span className="text-center flex justify-center items-center">
            {/*{metrics?.metrics?.[0] && (*/}
            {/*  <p>Views: {metrics?.metrics?.[0]?.startViews}</p>*/}
            {/*)}*/}

            {/*{video ? (*/}
            {/*  <p>{video.name}</p>*/}
            {/*) : (*/}
            {/*  <p>Select a video file to upload.</p>*/}
            {/*)}*/}

            {/*{!asset?.[0].id && (*/}
            {/*  <button*/}
            {/*    onClick={() => {*/}
            {/*      console.log("upload started");*/}
            {/*      createAsset?.();*/}
            {/*    }}*/}
            {/*    disabled={isLoading || !createAsset}*/}
            {/*  >*/}
            {/*    Upload*/}
            {/*  </button>*/}
            {/*)}*/}
          </span>
        </div>

        <div>Vote Power: 1 </div>
        <div>In Progress: 0</div>
      </span>
      <h1 style={{ "--base-width": `${titleWidth}vw`, x: "-50%" } as any}>
        {title}
      </h1>
      {videos.map(({ name, playbackId }, index) => (
        <Video
          setVideos={setVideos}
          name={name}
          playbackId={playbackId}
          index={index + 1}
          alt={alt}
          key={index}
          aspectRatio={"1.78"}
        />
      ))}
      <motion.div className="progress" style={{ scaleX }} />
      {/*<footer className="back">*/}
      {/*  <Link href="/">Back to galleries</Link>*/}
      {/*</footer>*/}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      />
    </article>
  );
};
export default DaoExamplePage;
