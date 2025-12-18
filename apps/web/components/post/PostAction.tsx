"use client";

import { useRouter } from "next/navigation";
import styles from "./PostAction.module.css";
import { useAuthStore } from "@/store/authStore";
import { postApi } from "@/lib/postApi";

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

  const onDelete = async () => {
    const ok = window.confirm("정말 삭제할까요?");
    if (!ok) return;

    try {
      await postApi.delete(Number(postId));
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
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
