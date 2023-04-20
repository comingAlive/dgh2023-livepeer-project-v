import React from "react";
import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox-next";
import { PaletteTree } from "./palette";
import Card from "@/pages";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/Card">
        <Card />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;