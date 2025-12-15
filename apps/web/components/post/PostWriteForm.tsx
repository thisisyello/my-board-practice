"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import styles from "./PostWriteForm.module.css";

type PostWriteMode = "create" | "edit";

type PostWriteFormProps = {
    mode?: PostWriteMode;
    initialTitle?: string;
    initialContent?: string;
    onSubmit?: (data: { title: string; content: string }) => void;
};

export default function PostWriteForm({mode = "create", initialTitle = "", initialContent = "", onSubmit}: PostWriteFormProps) {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedTitle = title.trim();
        const trimmedContent = content.trim();

        if (!trimmedTitle || !trimmedContent) {
            alert("제목과 내용을 입력해줘!");
            return;
        }

        if (onSubmit) {
            onSubmit({ title: trimmedTitle, content: trimmedContent });
            return;
        }

        alert(`${ui.submitText} 아직 구현 몬함`);
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <div className={styles.titleBlock}>
                    <h1 className={styles.h1}>{ui.pageTitle}</h1>
                </div>
            </div>

            <section className={styles.card}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="title">
                            제목
                        </label>
                        <input
                            id="title"
                            className={styles.input}
                            type="text"
                            placeholder="제목을 입력하세요"
                            maxLength={80}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className={styles.hint}>최대 80자</div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="content">
                        내용
                        </label>
                        <textarea
                            id="content"
                            className={styles.textarea}
                            placeholder="내용을 입력하세요"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </form>
            </section>

            <div className={styles.actions}>
                <button type="button" className={styles.btnCancel} onClick={() => router.back()}>
                    취소
                </button>

                <button type="button" className={styles.btnSubmit} onClick={() => {
                    const form = document.querySelector("form");
                    form?.dispatchEvent(new Event("submit", {cancelable: true, bubbles: true}));
                }}>
                    {ui.submitText}
                </button>
            </div>
        </div>
    );
}
