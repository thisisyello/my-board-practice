"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/authStore";


export default function Header() {
  const router = useRouter();
  const { user, token, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success("로그아웃 되었습니다.");
    router.push("/");
  };

  return (
    <header className="sticky top-0 w-full h-16 bg-white z-50 shadow-sm">
      <div className="max-w-[1028px] h-full mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-[28px] font-bold text-[#ffc83d]">
          yello
        </Link>

        <div className="flex gap-4 items-center">
          {token ? (
            <>
              <span className="flex items-center gap-2">
                <Link href="/mypage" className="text-gray-900 no-underline cursor-pointer hover:underline font-medium">
                  <b>{user?.userName}</b>님
                </Link>
              </span>
              <button 
                className="text-sm text-white bg-[#ffc83d] border-2 border-[#ffc83d] px-3 py-2 rounded font-medium transition-all hover:bg-[#e6b200] hover:border-[#e6b200] cursor-pointer"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-sm font-medium text-[#ffc83d] bg-white border-2 border-[#ffc83d] rounded px-3 py-2 transition-all hover:text-[#e6b200] hover:border-[#e6b200]">
                로그인
              </Link>
              <Link href="/auth/signup" className="text-sm text-white bg-[#ffc83d] border-2 border-[#ffc83d] px-3 py-2 rounded font-medium transition-all hover:bg-[#e6b200] hover:border-[#e6b200]">
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}