import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./LoginSignUpLayout.module.css";
import { useRouter } from "next/router";

function LoginSignUpLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Link href="/">
        <Image
          className={styles.logoImage}
          src="/images/fulllogo.svg"
          alt="로고 이미지"
          width="396"
          height="132"
        />
      </Link>
      {children}
      <div className={styles.simpleLogin}>
        <span>간편 로그인하기</span>
        <div className={styles.loginSNS}>
          <Link href="/">
            <Image
              className={styles.SNSImage}
              src="/images/google.svg"
              alt="로고 이미지"
              width="42"
              height="42"
            />
          </Link>
          <Link href="/">
            <Image
              className={styles.SNSImage}
              src="/images/kakaotalk.svg"
              alt="로고 이미지"
              width="42"
              height="42"
            />
          </Link>
        </div>
      </div>
      {router.pathname === "/login" ? (
        <div className={styles.footer}>
          <p>
            판다마켓이 처음이신가요?{" "}
            <Link className={styles.footerLink} href="/signup">
              회원가입
            </Link>
          </p>
        </div>
      ) : router.pathname === "/signup" ? (
        <div className={styles.footer}>
          <p>
            이미 회원이신가요?{" "}
            <Link className={styles.footerLink} href="/login">
              로그인
            </Link>
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default LoginSignUpLayout;
