import { Gallery } from "@/components/Gallery";
import { amsterdamPhotosMetadata } from "@/lib/data";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { selectedCardAtom } from "@/lib/jotai";
import { supabase } from "@/lib/supabaseClient";
import fetchMyTokenBalance from "@/lib/fetchMyTokenBalance";

const AmsterdamPage = () => {
  const [, selectCard] = useAtom(selectedCardAtom);
  useEffect(() => {
    selectCard("");
  }, []);

  useEffect(() => {
    const getVideos = async () => {
      const r = await supabase.from("daomotion_daoexample_videos").select();
      console.log(r);
      r.data && setVideos(r.data);
    };

    fetchMyTokenBalance().then((balance) => {
      if (Number(balance) > 0) {
        getVideos();
      }
    });
  }, []);

  const [videos, setVideos] = useState([]);

  return (
    <>
      <Gallery
        videos={videos}
        title="DAO Example"
        titleWidth={8.2}
        alt="A building in Amsterdam Zuid at night"
      />
    </>
  );
};
export default AmsterdamPage;
