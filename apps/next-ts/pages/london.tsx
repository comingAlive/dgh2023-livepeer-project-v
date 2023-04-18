import { londonPhotosMetadata } from "@/lib/data";
import { Gallery } from "@/components/Gallery";

const LondonPage = () => {
  return (
    <Gallery
      photos={londonPhotosMetadata}
      title="White lines of Canary Wharf"
      titleWidth={8}
      category="canary"
      alt="A building in Canary Wharf"
    />
  );
};
export default LondonPage;
