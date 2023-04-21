import CreateAndViewAsset from "@/components/CreateAndViewAsset";
import { Stream } from "@/components/Stream";
import Motion1 from "@/components/Motion1";

export default function Test() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CreateAndViewAsset />
      <div>hi</div>
      <Motion1 />
      <div>hi</div>
    </main>
  );
}
