"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/authStore";

import styles from "./Header.module.css";
export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, token, logout } = useAuthStore();
  
  // Auth 관련 페이지에서는 헤더 숨김
  if (pathname?.startsWith("/auth")) return null;

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
              <Link href="/mypage" className={styles.userGreeting}>
                <strong>{user?.userName}</strong>님
              </Link>
              <button 
                className={`${styles.btn} ${styles.danger}`}
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className={`${styles.btn} ${styles.secondary}`}>
                로그인
              </Link>
              <Link href="/auth/signup" className={`${styles.btn} ${styles.primary}`}>
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}