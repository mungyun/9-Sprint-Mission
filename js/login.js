// 비밀번호 가시성 토글
document.querySelectorAll(".password-box").forEach((e) => {
  const eyeButton = e.querySelector(".eye");
  const password = e.querySelector(".password");
  let isVisible = false;

  eyeButton.addEventListener("click", () => {
    isVisible = !isVisible;
    password.setAttribute("type", isVisible ? "text" : "password");
    eyeButton.innerHTML = `<img src='images/eye_${
      isVisible ? "open" : "close"
    }.svg' class='eye-img' width='24px' height='24px' alt='eye'>`;
  });
});

// 이메일, 비밀번호 입력 유효성 검사 함수
function validateInput(input, validator, errorElement, errorMessage) {
  const value = input.value.trim();
  if (value === "") {
    showError(input, errorElement, `${input.placeholder}`);
  } else if (!validator(value)) {
    showError(input, errorElement, errorMessage);
  } else {
    hideError(input, errorElement);
  }
  checkLoginValidation();
}

// 이메일 유효성 검사
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");
emailInput.addEventListener("focusout", () =>
  validateInput(
    emailInput,
    (email) => emailInput.checkValidity(),
    emailError,
    "잘못된 이메일 형식입니다."
  )
);
emailInput.addEventListener("focus", () => hideError(emailInput, emailError));

// 비밀번호 유효성 검사
const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("password-error");
passwordInput.addEventListener("focusout", () =>
  validateInput(
    passwordInput,
    (password) => password.length >= 8,
    passwordError,
    "비밀번호를 8자 이상 입력해주세요."
  )
);
passwordInput.addEventListener("focus", () =>
  hideError(passwordInput, passwordError)
);

// 오류 메시지 표시 함수
function showError(input, errorElement, message) {
  input.classList.add("error");
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

// 오류 메시지 숨기기 함수
function hideError(input, errorElement) {
  input.classList.remove("error");
  errorElement.textContent = "";
  errorElement.style.display = "none";
}

// 로그인 버튼 활성화/비활성화 함수
function checkLoginValidation() {
  const isEmailValid =
    emailInput.value.trim() !== "" && emailInput.checkValidity();
  const isPasswordValid =
    passwordInput.value.trim() !== "" && passwordInput.value.length >= 8;

  loginButton.disabled = !(isEmailValid && isPasswordValid);
  loginButton.classList.toggle("enabled", isEmailValid && isPasswordValid);
}

// 로그인 폼 제출 이벤트 처리
const loginButton = document.getElementById("login-button");
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!loginButton.disabled) {
    window.location.href = "../items.html";
  }
});
