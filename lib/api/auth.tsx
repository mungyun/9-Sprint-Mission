import axios from "./axios";

// 회원가입
export async function signUp({
  email,
  nickname,
  password,
  passwordConfirmation,
}) {
  try {
    const res = await axios.post("/auth/signUp", {
      email,
      nickname,
      password,
      passwordConfirmation,
    });
    return res.data;
  } catch (error) {
    console.error("회원가입 오류:", error);
    throw error;
  }
}

// 로그인
export async function login({ email, password }) {
  try {
    const res = await axios.post("/auth/signIn", { email, password });

    const { accessToken, refreshToken } = res.data;
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }
    return res.data;
  } catch (error) {
    console.error("로그인 오류:", error);
    throw error;
  }
}
