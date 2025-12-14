"use client";

import Link from "next/link";
import styles from "./SignupForm.module.css";

export default function SignupForm() {
  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">
          이름
        </label>
        <input id="name" className={styles.input} type="text" placeholder="이름" autoComplete="name"/>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          아이디
        </label>
        <input id="id" className={styles.input} placeholder="아이디"/>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="password">
          비밀번호
        </label>
        <input id="password" className={styles.input} type="password" placeholder="•••••" autoComplete="new-password"/>
      </div>

      <button className={styles.btn} type="submit">
        회원가입
      </button>

      <div className={styles.helper}>
        이미 계정이 있나요?{" "}
        <Link className={styles.link} href="/login">
          로그인
        </Link>
      </div>
    </form>
  );
}