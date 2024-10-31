import styles from "./SignUpForm.module.css";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { useForm } from "@/hooks/useForm";

function SignUpForm() {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isFormInvalid,
  } = useForm(true);

  return (
    <form className={styles.signupform} onSubmit={handleSubmit}>
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

      <div>
        <InputField
          label="닉네임"
          value={values.nickname}
          name="nickname"
          type="text"
          placeholder="닉네임을 입력해주세요."
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.nickname}
        />
        {errors.nickname && (
          <p className={styles.errorMessage}>{errors.nickname}</p>
        )}
      </div>

      <div>
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

      <InputField
        label="비밀번호 확인"
        value={values.passwordConfirm}
        name="passwordConfirm"
        type="password"
        placeholder="비밀번호를 다시 한 번 입력해주세요."
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.passwordConfirm}
      />
      {errors.passwordConfirm && (
        <p className={styles.errorMessage}>{errors.passwordConfirm}</p>
      )}

      <Button
        width="100%"
        height="56px"
        radius="40px"
        background={`${isFormInvalid() ? "#9CA3AF" : "#3692FF"}`}
        type="submit"
        disabled={isFormInvalid()}
      >
        회원가입
      </Button>
    </form>
  );
}

export default SignUpForm;
