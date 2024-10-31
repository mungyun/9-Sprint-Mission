import { ClipLoader } from "react-spinners";
import styles from "./LoadingSpinner.module.css";

function LoadingSpinner() {
  return (
    <div className={styles.loading}>
      <ClipLoader color="#3692FF" />
    </div>
  );
}

export default LoadingSpinner;
