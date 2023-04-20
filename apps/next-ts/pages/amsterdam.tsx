import { Gallery } from "@/components/Gallery";
import { amsterdamPhotosMetadata } from "@/lib/data";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { selectedCardAtom } from "@/lib/jotai";

const AmsterdamPage = () => {
  const [, selectCard] = useAtom(selectedCardAtom);
  useEffect(() => {
    selectCard("");
  }, []);

  return (
    <Gallery
      photos={amsterdamPhotosMetadata}
      title="Amsterdam Zuid nightwalk"
      titleWidth={8.2}
      category="zuid"
      alt="A building in Amsterdam Zuid at night"
    />
  );
};
export default AmsterdamPage;
