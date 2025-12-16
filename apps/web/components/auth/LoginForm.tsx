"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { authApi, LoginParams } from "../../lib/authApi";
import { useAuthStore } from "../../store/authStore";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginParams>();

  const onSubmit = async (data: LoginParams) => {
    try {
      const response = await authApi.login(data);
      login(response.accessToken, response.user);
      toast.success("로그인 성공");
      router.push("/");
    } catch (error: unknown) {
      console.error(error);
      const err = error as { response?: { data?: { message?: string | string[] } } };
      const message = err.response?.data?.message || "로그인에 실패했습니다.";
      toast.error(Array.isArray(message) ? message[0] : message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="userId">
          아이디
        </label>
        <input id="userId" className={styles.input} placeholder="아이디" {...register("userId", { required: "아이디를 입력해주세요" })}/>
        {errors.userId && <span className={styles.error}>{errors.userId.message}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="password">
          비밀번호
        </label>
        <input id="password" className={styles.input} type="password" placeholder="•••••" autoComplete="current-password" {...register("password", { required: "비밀번호를 입력해주세요" })}/>
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
      </div>

      <button className={styles.btn} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "로그인 중..." : "로그인"}
      </button>

      <div className={styles.row}>
        <div className={styles.helper}>
          계정이 없나요?
          <Link className={styles.link} href="/auth/signup">
            회원가입
          </Link>
        </div>
      </div>
    </form>
  );
}