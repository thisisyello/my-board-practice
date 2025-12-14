"use client";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          yello
        </Link>

        <div className={styles.actions}>
          <Link href="/auth/login" className={styles.login}>
            로그인
          </Link>
          <Link href="/auth/signup" className={styles.signup}>
            회원가입
          </Link>
        </div>
      </div>
    </header>
  );
}