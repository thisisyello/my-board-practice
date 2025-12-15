"use client";

import { useState } from "react";
import styles from "./LikeButton.module.css";

type LikeButtonProps = {
  initialCount: number;
};

export default function LikeButton({ initialCount }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setCount((prev) => (liked ? prev - 1 : prev + 1));
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
