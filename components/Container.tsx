import { ReactNode } from "react";
import styles from "@/styles/Container.module.css";

function Container({ children }: { children: ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}

export default Container;
