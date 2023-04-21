import { Player, useAssetMetrics, useCreateAsset } from "@livepeer/react";

import { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

const CreateAndViewAsset = () => {
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
  const { data: metrics } = useAssetMetrics({
    assetId: asset?.[0].id,
    refetchInterval: 30000,
  });

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

  const isLoading = useMemo(
    () =>
      status === "loading" ||
      (asset?.[0] && asset[0].status?.phase !== "ready"),
    [status, asset]
  );

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
    <div>
      <pre>{JSON.stringify(asset, null, 4)}</pre>
      {!asset && (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag and drop or browse files</p>

          {error?.message && <p>{error.message}</p>}
        </div>
      )}

      {asset?.[0]?.playbackId && (
        <Player
          accessKey="123"
          title={"file_example_MP4_480_1_5MG.mp4"}
          playbackId={"0711aduvqnvwmm52"}
        />
      )}

      <div>
        {metrics?.metrics?.[0] && (
          <p>Views: {metrics?.metrics?.[0]?.startViews}</p>
        )}

        {video ? <p>{video.name}</p> : <p>Select a video file to upload.</p>}

        {progressFormatted && <p>{progressFormatted}</p>}

        {!asset?.[0].id && (
          <button
            onClick={() => {
              console.log("upload started");
              createAsset?.();
            }}
            disabled={isLoading || !createAsset}
          >
            Upload
          </button>
        )}
      </div>
    </div>
  );
};
export default CreateAndViewAsset;
