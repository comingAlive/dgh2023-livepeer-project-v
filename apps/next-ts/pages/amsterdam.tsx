import { Gallery } from "@/components/Gallery";
import { amsterdamPhotosMetadata } from "@/lib/data";

const AmsterdamPage = () => {
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
