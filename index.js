// SignUp form fields
const signupName = document.getElementById("signupName");
const signupEmail = document.getElementById("signupEmail");
const signupTelephone = document.getElementById("signupTelephone");
const signupPassword = document.getElementById("signupPassword");
const signupConfirmPassword = document.getElementById("signupConfirmPassword");
const signUpBtn = document.querySelector("#signUpBtn");

// Login form fields
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginBtn = document.querySelector("#loginBtn");

// Others
const notification = document.querySelector(".notificationContainer");
const otherSide = document.querySelector(".otherSide");

const createAccount = () => {
  const user = {
    name: signupName.value,
    email: signupEmail.value,
    telephone: signupTelephone.value,
    password: signupPassword.value,
    confirmPassword: signupConfirmPassword.value,
  };

  formVerification(user);
};

const login = () => {
  const userLogin = {
    email: loginEmail.value,
    password: Number(loginPassword.value),
  };

  const userTest = {
    email: "viniolicar2004@gmail.com",
    password: 123456,
  };

  if (
    userLogin.email === userTest.email &&
    userLogin.password === userTest.password
  ) {
    // Substituir a mensagem por uma função de login
    messages("Login correto", "success");
  } else {
    messages("Usuário ou senha incorretos", "error");
  }
};

const formVerification = (user) => {
  if (user.password != user.confirmPassword) {
    signupPassword.classList.add("invalid");
    signupConfirmPassword.classList.add("invalid");
    messages("A senhas não batem", "error");
  } else if (user.password.length < 6) {
    signupPassword.classList.add("invalid");
    messages("Sua senha deve possuir ao menos 6 caracteres", "error");
  } else {
    signupConfirmPassword.classList.remove("invalid");
    signupPassword.classList.remove("invalid");
  }

  if (user.telephone.length < 16) {
    signupTelephone.classList.add("invalid");
    messages("Adicione um telefone válido", "error");
  } else {
    signupTelephone.classList.remove("invalid");
  }
};

const messages = (message, status) => {
  notification.removeAttribute("error");
  notification.removeAttribute("success");

  if (status === "error") {
    notification.setAttribute("error", "");
  } else if (status === "success") {
    notification.setAttribute("success", "");
  }

  notification.style.display = "block";
  notification.innerHTML = message;

  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
};

const signupFormValidation = () => {
  if (
    signupName.value === "" ||
    signupEmail.value === "" ||
    signupTelephone.value === "" ||
    signupPassword.value === "" ||
    signupConfirmPassword.value === ""
  ) {
    signUpBtn.setAttribute("disabled", true);
  } else {
    signUpBtn.removeAttribute("disabled");
  }
};

const loginFormValidation = () => {
  if (loginEmail.value === "" || loginPassword.value === "") {
    loginBtn.setAttribute("disabled", true);
  } else {
    loginBtn.removeAttribute("disabled");
  }
};

const telephoneMask = () => {
  signupTelephone.value = signupTelephone.value.replace(/\D/g, "");
  signupTelephone.value = signupTelephone.value.replace(
    /^(\d{2})(\d)(\d+)/,
    "($1) $2 $3"
  );
  signupTelephone.value = signupTelephone.value.replace(/(\d{4})(\d)/, "$1-$2");
};

const formChange = (direction) => {
  if (direction === "left") {
    otherSide.classList.remove("right");
    otherSide.classList.add("left");
  } else {
    otherSide.classList.remove("left");
    otherSide.classList.add("right");
  }
};
