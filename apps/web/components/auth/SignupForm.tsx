"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { authApi, SignupParams } from "../../lib/authApi";
import styles from "./SignupForm.module.css";

export default function SignupForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupParams>();

  const onSubmit = async (data: SignupParams) => {
    try {
      await authApi.signup(data);
      toast.success("회원가입이 완료되었습니다! 로그인해주세요.");
      router.push("/auth/login");
    } catch (error: unknown) {
      console.error(error);
      const err = error as { response?: { data?: { message?: string | string[] } } };
      const message = err.response?.data?.message || "회원가입 중 오류가 발생했습니다.";
      toast.error(Array.isArray(message) ? message[0] : message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="userName">
          이름
        </label>
        <input 
          id="userName" 
          className={styles.input} 
          type="text" 
          placeholder="이름" 
          autoComplete="name"
          {...register("userName", { required: "이름을 입력해주세요" })}
        />
        {errors.userName && <span className={styles.error}>{errors.userName.message}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="userId">
          아이디
        </label>
        <input id="userId" className={styles.input} placeholder="아이디 (4자 이상)"
          {...register("userId", { 
            required: "아이디를 입력해주세요",
            minLength: { value: 4, message: "아이디는 4자 이상이어야 합니다" }
          })}
        />
        {errors.userId && <span className={styles.error}>{errors.userId.message}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="password">
          비밀번호
        </label>
        <input 
          id="password" 
          className={styles.input} 
          type="password" 
          placeholder="••••• (4자 이상)" 
          autoComplete="new-password"
          {...register("password", { 
            required: "비밀번호를 입력해주세요",
            minLength: { value: 4, message: "비밀번호는 4자 이상이어야 합니다" }
          })}
        />
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
      </div>

      <button className={styles.btn} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "가입 중..." : "회원가입"}
      </button>

      <div className={styles.helper}>
        이미 계정이 있나요?{" "}
        <Link className={styles.link} href="/auth/login">
          로그인
        </Link>
      </div>
    </form>
  );
}