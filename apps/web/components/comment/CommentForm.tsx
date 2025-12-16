"use client";

import { useState } from "react";
import styles from "./CommentForm.module.css";
import { commentApi } from "@/lib/commentApi";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

type CommentFormProps = {
  postId: number;
  onCommentAdded: () => void;
};

export default function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const [text, setText] = useState("");
  const { user } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        toast.error("로그인이 필요합니다.");
        router.push("/auth/login");
        return;
    }
    if (!text.trim()) return;

    try {
        await commentApi.create(postId, text);
        setText("");
        toast.success("댓글이 등록되었습니다.");
        onCommentAdded();
    } catch (error: any) {
        console.error("Comment create failed details:", JSON.stringify(error.response?.data || error));
        toast.error(`댓글 등록 실패: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea 
        className={styles.textarea} 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder={user ? "댓글을 입력하세요" : "로그인 후 이용해주세요"} 
        maxLength={100}
        disabled={!user}
      />

      <div className={styles.row}>
        <div className={styles.hint}>{text.length}/100</div>
        <button className={styles.btn} type="submit" disabled={!text.trim() || !user}>
            댓글 등록
        </button>
      </div>
    </form>
  );
}
