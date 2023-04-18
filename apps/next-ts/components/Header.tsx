import { useState } from "react";
import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Example } from "@/components/Example";

const Span = ({ children }) => {
  return (
    <span className="cursor-pointer text-2xl font-bold duration-300">
      {children}
    </span>
  );
};

const Header = () => {
  const [isOn, setIsOn] = useState(false);

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };
  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <div className="flex justify-between items-center">
     <div className="flex items-center gap-4">
       <Example/>
       <div className="switch ml-8 mt-8" data-isOn={isOn} onClick={toggleSwitch}>
         <motion.div className="handle" layout transition={spring} />
       </div>
     </div>
      <div className="mt-13 mr-24 flex items-center justify-end gap-12">
        <ConnectButton/>
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
