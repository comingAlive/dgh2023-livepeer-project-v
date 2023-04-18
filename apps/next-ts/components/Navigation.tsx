import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import styles from "./Example.module.css";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const menus = ["Uploads", "DAOs", "", ""];

export const Navigation = () => (
  <motion.ul className={styles.ul + " !ml-8"} variants={variants}>
    {menus.map((n, i) => (
      <MenuItem name={n} i={n + i} key={n + i} />
    ))}
  </motion.ul>
);
