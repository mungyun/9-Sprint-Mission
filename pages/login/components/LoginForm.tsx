import styles from "./LoginForm.module.css";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { useForm } from "@/hooks/useForm";

function LoginForm() {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isFormInvalid,
  } = useForm(false);

  return (
    <form className={styles.loginform} onSubmit={handleSubmit}>
      <div className={styles.inputField}>
        <InputField
          label="이메일"
          value={values.email}
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요."
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
        />
        {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
      </div>

      <div className={styles.inputField}>
        <InputField
          label="비밀번호"
          value={values.password}
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
        />
        {errors.password && (
          <p className={styles.errorMessage}>{errors.password}</p>
        )}
      </div>

      <Button
        width="100%"
        height="56px"
        radius="40px"
        background={`${isFormInvalid() ? "#9CA3AF" : "#3692FF"}`}
        type="submit"
        disabled={isFormInvalid()}
      >
        로그인
      </Button>
    </form>
  );
}

export default LoginForm;
