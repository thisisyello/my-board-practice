"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import styles from "./PostWriteForm.module.css";
import { postApi } from "@/lib/postApi";
import toast from "react-hot-toast";

type PostWriteMode = "create" | "edit";

type PostWriteFormProps = {
    mode?: PostWriteMode;
    initialTitle?: string;
    initialContent?: string;
    postId?: number;
};

export default function PostWriteForm({mode = "create", initialTitle = "", initialContent = "", postId}: PostWriteFormProps) {
    const router = useRouter();

    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);

    const ui = useMemo(() => {
        const isEdit = mode === "edit";
        return {
            pageTitle: isEdit ? "수정하기" : "글쓰기",
            submitText: isEdit ? "수정" : "등록",
        };
    }, [mode]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedTitle = title.trim();
        const trimmedContent = content.trim();
        if (!trimmedTitle || !trimmedContent) {
            toast.error("제목과 내용을 입력해주세요.");
            return;
        }
        try {
            if (mode === "create") {
                await postApi.create({ title: trimmedTitle, content: trimmedContent });
                toast.success("게시글이 등록되었습니다!");
                router.push("/");
            }
            if (mode === "edit" && postId) {
                await postApi.update(postId, { title: trimmedTitle, content: trimmedContent });
                toast.success("게시글이 수정되었습니다!");
                router.push(`/post/${postId}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("게시글 등록에 실패했습니다.");
        }
    };

    return (
        <div className={styles.wrap}>
            <button type="button" className={styles.backBtn} onClick={() => router.back()}>
                ← 취소하고 돌아가기
            </button>

            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    id="title"
                    className={styles.titleInput}
                    type="text"
                    placeholder="제목을 입력하세요"
                    maxLength={80}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                
                <textarea
                    id="content"
                    className={styles.textarea}
                    placeholder="내용을 입력하세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <div className={styles.actions}>
                    <button type="submit" className={styles.btnSubmit}>
                        {ui.submitText}
                    </button>
                </div>
            </form>
        </div>
    );
}
