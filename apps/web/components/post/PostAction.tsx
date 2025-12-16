"use client";

import { useRouter } from "next/navigation";
import styles from "./PostAction.module.css";
import { useAuthStore } from "@/store/authStore";

type PostActionProps = {
  postId: number | string;
  authorId: number;
};

export default function PostAction({ postId, authorId }: PostActionProps) {
  const router = useRouter();
  const { user } = useAuthStore();

  const isAuthor = user?.id === authorId;
  if (!isAuthor) return null;

  const onEdit = () => {
    router.push(`/post/${postId}/edit`);
  };

  const onDelete = () => {
    const ok = window.confirm("정말 삭제할까요?");
    if (!ok) return;

    // 나중에 API 붙이면 여기서 DELETE 요청
    alert(`삭제: postId=${postId}`);
    router.push("/");
    router.refresh();
  };

  return (
    <div className={styles.actions}>
      <button type="button" className={styles.btn} onClick={onEdit}>
        수정
      </button>
      <button
        type="button"
        className={`${styles.btn} ${styles.danger}`}
        onClick={onDelete}
      >
        삭제
      </button>
    </div>
  );
}
