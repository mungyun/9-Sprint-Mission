// hooks/useForm.js
import { useState } from "react";
import { useRouter } from "next/router";

const INITIAL_VALUES = {
  email: "",
  password: "",
  nickname: "",
  passwordConfirm: "",
};

export function useForm(isSignUp = false) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState(INITIAL_VALUES);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      if (!value) {
        setErrors((prev) => ({
          ...prev,
          email: "이메일을 입력해주세요.",
        }));
      } else if (!validateEmail(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "잘못된 이메일 형식입니다.",
        }));
      }
    } else if (isSignUp && name === "nickname") {
      if (!value) {
        setErrors((prev) => ({
          ...prev,
          nickname: "닉네임을 입력해주세요.",
        }));
      }
    } else if (name === "password") {
      if (!value) {
        setErrors((prev) => ({
          ...prev,
          password: "비밀번호를 입력해주세요.",
        }));
      } else if (value.length < 8) {
        setErrors((prev) => ({
          ...prev,
          password: "비밀번호를 8자 이상 입력해주세요.",
        }));
      }
    } else if (isSignUp && name === "passwordConfirm") {
      if (value !== values.password) {
        setErrors((prev) => ({
          ...prev,
          passwordConfirm: "비밀번호가 일치하지 않습니다.",
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp && isFormInvalid()) return;

    if (isSignUp) {
      router.push("/signin");
    } else {
      router.push("/items");
    }
    setValues(INITIAL_VALUES);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormInvalid = () =>
    !values.email ||
    !values.password ||
    !!errors.email ||
    !!errors.password ||
    (isSignUp &&
      (!values.nickname ||
        !values.passwordConfirm ||
        !!errors.nickname ||
        !!errors.passwordConfirm));

  return {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isFormInvalid,
  };
}
