"use client";

import { postApi } from "@/lib/postApi";
import { useState } from "react";
import styles from "./LikeButton.module.css";
import toast from "react-hot-toast";

type LikeButtonProps = {
  postId: number;
  initialCount: number;
};

export default function LikeButton({ postId, initialCount }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);

  const toggleLike = async () => {
    const nextLiked = !liked;
    setLiked(nextLiked);
    setCount((prev) => (nextLiked ? prev + 1 : prev - 1));

    try {
        await postApi.like(postId, nextLiked);
    } catch (error: boolean) {
        console.error("Like failed:", error.response?.data || error.message);
        toast.error(`좋아요 실패`);
        
        setLiked(!nextLiked);
        setCount((prev) => (!nextLiked ? prev + 1 : prev - 1));
    }
  };

  return (
    <button
      type="button"
      onClick={toggleLike}
      className={`${styles.likeBtn} ${liked ? styles.active : ""}`}
    >
      💛 {count}
    </button>
  );
}
