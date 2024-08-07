// 닉네임 유효성 검사
const nicknameInput = document.getElementById("nickname");
const nickError = document.getElementById("nickname-error");
nicknameInput.addEventListener("focusout", () =>
  validateInput(
    nicknameInput,
    (nickname) => nickname.trim() !== "",
    nickError,
    ""
  )
);
nicknameInput.addEventListener("focus", () =>
  hideError(nicknameInput, nickError)
);

// 비밀번호 확인 유효성 검사
const passwordConfirmInput = document.getElementById("password-confirm");
const passwordConfirmError = document.getElementById("password-confirm-error");
passwordConfirmInput.addEventListener("focusout", () =>
  validateInput(
    passwordConfirmInput,
    () => passwordInput.value.trim() === passwordConfirmInput.value.trim(),
    passwordConfirmError,
    "비밀번호가 일치하지 않습니다."
  )
);
passwordConfirmInput.addEventListener("focus", () =>
  hideError(passwordConfirmInput, passwordConfirmError)
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

// 회원가입 버튼 활성화/비활성화 함수
function checkSignupValidation() {
  const isEmailValid =
    emailInput.value.trim() !== "" && emailInput.checkValidity();
  const isNicknameValid = nicknameInput.value.trim() !== "";
  const isPasswordValid =
    passwordInput.value.trim() !== "" && passwordInput.value.length >= 8;
  const isPasswordConfirmValid =
    passwordConfirmInput.value.trim() !== "" &&
    passwordInput.value.trim() === passwordConfirmInput.value.trim();

  passwordButton.disabled = !(
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordConfirmValid
  );
  passwordButton.classList.toggle(
    "enabled",
    isEmailValid && isNicknameValid && isPasswordValid && isPasswordConfirmValid
  );
}

// 회원가입 폼 제출 이벤트 처리
const passwordButton = document.getElementById("password-button");
const passwordForm = document.getElementById("password-form");
passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!passwordButton.disabled) {
    window.location.href = "../signin.html";
  }
});
