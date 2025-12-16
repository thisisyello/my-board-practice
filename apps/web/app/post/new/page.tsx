"use client";

import PostWriteForm from "@/components/post/PostWriteForm";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function NewPostPage() {
  const router = useRouter();
  const { token } = useAuthStore();

  const toastShown = useRef(false);

  useEffect(() => {
    if (!token) {
      if (!toastShown.current) {
        toast.error("로그인이 필요한 서비스입니다.");
        toastShown.current = true;
        router.push("/auth/login");
      }
    }
  }, [token, router]);

  if (!token) return null;

  return <PostWriteForm mode="create" />;
}
