"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./CommentList.module.css";
import { commentApi, Comment } from "@/lib/commentApi";

type CommentListProps = {
  postId: number;
  refreshKey: number;
};

import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

export default function CommentList({ postId, refreshKey }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const { user } = useAuthStore();
  
  // Edit State
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  const fetchComments = useCallback(async () => {
    try {
      const data = await commentApi.getAll(postId);
      setComments(data);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments, refreshKey]);

  // Handlers
  const handleEditClick = (comment: Comment) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditContent("");
  };

  const handleUpdate = async (id: number) => {
    if (!editContent.trim()) return;
    try {
      await commentApi.update(id, editContent);
      toast.success("댓글이 수정되었습니다.");
      setEditingId(null);
      fetchComments();
    } catch (error) {
      toast.error("댓글 수정 실패");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await commentApi.delete(id);
      toast.success("댓글이 삭제되었습니다.");
      fetchComments();
    } catch (error) {
      toast.error("댓글 삭제 실패");
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.titleRow}>
        <h2 className={styles.title}>댓글</h2>
        <div className={styles.count}>{comments.length}개</div>
      </div>

      <div className={styles.list}>
        {comments.length === 0 ? (
           <div className={styles.empty}>아직 댓글이 없습니다.</div>
        ) : (
          comments.map((c) => (
            <div key={c.id} className={styles.item}>
              <div className={styles.top}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div className={styles.author}>{c.user.userName}</div>
                  <div className={styles.date}>{new Date(c.createdAt).toLocaleDateString()}</div>
                </div>
                {user?.id === c.userId && (
                  <div className={styles.actions}>
                    {editingId === c.id ? (
                      <>
                        <button onClick={() => handleUpdate(c.id)} className={styles.actionBtn}>저장</button>
                        <button onClick={handleCancelClick} className={styles.actionBtn}>취소</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditClick(c)} className={styles.actionBtn}>수정</button>
                        <button onClick={() => handleDelete(c.id)} className={styles.actionBtn}>삭제</button>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              {editingId === c.id ? (
                <textarea 
                  className={styles.editInput}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  maxLength={100}
                />
              ) : (
                <div className={styles.body}>{c.content}</div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
