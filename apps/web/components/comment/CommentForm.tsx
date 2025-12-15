"use client";

import { useState } from "react";
import styles from "./CommentForm.module.css";

export default function CommentForm() {
  const [text, setText] = useState("");

  return (
    <form className={styles.form} onSubmit={(e) => {
        e.preventDefault();
        alert(`아직 구현 몬함: ${text}`);
        setText("");
    }}>

      <textarea className={styles.textarea} value={text} onChange={(e) => setText(e.target.value)} placeholder="댓글을 입력하세요" maxLength={100}/>

      <div className={styles.row}>
        <div className={styles.hint}>{text.length}/100</div>
        <button className={styles.btn} type="submit" disabled={!text.trim()}>
            댓글 등록
        </button>
      </div>
    </form>
  );
}
