import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "jotai";
import Header from "@/components/Header";
import { Inter } from "next/font/google";

import {
  createReactClient,
  LivepeerConfig,
  studioProvider,
} from "@livepeer/react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, optimism, polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
  }),
});

const inter = Inter({ subsets: ["latin"] });

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <div className={inter.className}>
      <LivepeerConfig client={livepeerClient}>
        <Provider>
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
              <AnimatePresence mode="wait" initial={false}>
                {router.asPath === "/" && <Header />}
                <Component {...pageProps} />
              </AnimatePresence>
            </RainbowKitProvider>
          </WagmiConfig>
        </Provider>
      </LivepeerConfig>
    </div>
  );
}
