import { useState } from "react";
import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Example } from "@/components/Example";
import { useTheme } from "next-themes";

const Header = () => {
  const [isOn, setIsOn] = useState(false);

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  const { theme, setTheme } = useTheme();

  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Example />
        <div
          className="switch ml-80 mt-8"
          data-isOn={isOn}
          onClick={() => {
            toggleSwitch();
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        >
          <motion.div className="handle" layout transition={spring} />
        </div>
      </div>
      <div className="mt-13 mr-24 flex items-center justify-end gap-12">
        <ConnectButton showBalance={false} />
      </div>
      {/*<div className="mt-13 mr-24 flex items-center justify-end gap-12">*/}
      {/*  <Span>Use Cases</Span>*/}
      {/*  <Span>Blog</Span>*/}
      {/*  <Span>Community</Span>*/}
      {/*  <Span>Get In Touch</Span>*/}
      {/*  <button className="w-min px-9 text-2xl normal-case btn btn-circle btn-outline btn-lg">*/}
      {/*    Documentation*/}
      {/*  </button>*/}
      {/*</div>*/}
    </div>
  );
};
export default Header;
