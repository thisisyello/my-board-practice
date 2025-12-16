"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/authStore";
import styles from "./Header.module.css";

export default function Header() {
  const router = useRouter();
  const { user, token, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success("로그아웃 되었습니다.");
    router.push("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          yello
        </Link>

        <div className={styles.actions}>
          {token ? (
            <>
              <span className={styles.welcome}>
                <Link href="/mypage" className={styles.userName}>
                  <b>{user?.userName}</b>님
                </Link>
              </span>
              <button className={styles.logout} onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className={styles.login}>
                로그인
              </Link>
              <Link href="/auth/signup" className={styles.signup}>
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}