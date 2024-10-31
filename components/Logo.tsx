import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <Link href="/" className={styles.logoLink}>
      <Image
        className={styles.logoImg}
        src="/images/panda_face.svg"
        alt="로고이미지"
        width={40}
        height={40}
      />
      <Image
        className={styles.logoText}
        src="/images/panda_market.svg"
        alt="판다마켓"
        width={103}
        height={35}
      />
    </Link>
  );
};

export default Logo;
