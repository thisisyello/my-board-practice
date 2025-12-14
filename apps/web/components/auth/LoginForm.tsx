"use client";

import Link from "next/link";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">
          이메일
        </label>
        <input
          id="email"
          className={styles.input}
          type="email"
          placeholder="email@example.com"
          autoComplete="email"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="password">
          비밀번호
        </label>
        <input
          id="password"
          className={styles.input}
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </div>

      <button className={styles.btn} type="submit">
        로그인
      </button>

      <div className={styles.row}>
        <div className={styles.helper}>
          계정이 없나요?{" "}
          <Link className={styles.link} href="/signup">
            회원가입
          </Link>
        </div>
      </div>
    </form>
  );
}