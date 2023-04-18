import { countAtom } from "@/lib/jotai";
import { useAtom } from "jotai";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {CreateAndViewAsset} from "@/components/CreateAndViewAsset";

export default function Home() {
  const [count, setCount] = useAtom(countAtom);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CreateAndViewAsset/>
      {/*<Stream />*/}
      <ConnectButton />
      <button
        className="btn btn-lg btn-primary"
        onClick={() => setCount((c) => c + 1)}
      >
        Button
      </button>
    </main>
  );
}
