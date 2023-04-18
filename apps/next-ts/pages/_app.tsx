import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "jotai";
import Header from "@/components/Header";
import { Inter } from "next/font/google";

import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
  }),
});

const inter = Inter({ subsets: ["latin"] });

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

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
  return (
    <div className={inter.className}>
      <LivepeerConfig client={livepeerClient}>
        <Provider>
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
              <Header />
              <Component {...pageProps} />
            </RainbowKitProvider>
          </WagmiConfig>
        </Provider>
      </LivepeerConfig>
    </div>
  );
}
