import { countAtom } from "@/lib/jotai";
import { useAtom } from "jotai";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {CreateAndViewAsset} from "@/components/CreateAndViewAsset";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CreateAndViewAsset/>
      {/*<Stream />*/}
      <ConnectButton />
    </main>
  );
}
