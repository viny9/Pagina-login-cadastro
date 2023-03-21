const names = document.getElementById("name");
const email = document.getElementById("email");
const telephone = document.getElementById("telephone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const notification = document.querySelector(".notificationContainer");
const signUpBtn = document.querySelector(".signUpBtn");

const createAccount = () => {
  const user = {
    name: names.value,
    email: email.value,
    telephone: telephone.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  };

  formVerification(user);
};

const formVerification = (user) => {
  if (user.password != user.confirmPassword) {
    password.classList.add("invalid");
    confirmPassword.classList.add("invalid");
    messages("A senhas não batem", "error");
  } else if (user.password.length < 6) {
    password.classList.add("invalid");
    messages("Sua senha deve possuir ao menos 6 caracteres", "error");
  } else {
    confirmPassword.classList.remove("invalid");
    password.classList.remove("invalid");
  }

  if (user.telephone.length < 16) {
    telephone.classList.add("invalid");
    messages("Adicione um telefone válido", "error");
  } else {
    telephone.classList.remove("invalid");
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

const formValidation = () => {
  if (
    names.value === "" ||
    email.value === "" ||
    telephone.value === "" ||
    password.value === "" ||
    confirmPassword.value === ""
  ) {
    signUpBtn.setAttribute("disabled", true);
  } else {
    signUpBtn.removeAttribute("disabled");
  }
};

const telephoneMask = () => {
  telephone.value = telephone.value.replace(/\D/g, "");
  telephone.value = telephone.value.replace(/^(\d{2})(\d)(\d+)/, "($1) $2 $3");
  telephone.value = telephone.value.replace(/(\d{4})(\d)/, "$1-$2");
};
