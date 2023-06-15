// SignUp form fields
const signUpForm = document.querySelector("#signUp");
const teste = document.querySelector("#signUp");
const imgInput = document.querySelector("#imgInput");
const signupName = document.querySelector("#signupName");
const signupEmail = document.querySelector("#signupEmail");
const signupAge = document.querySelector("#signupAge");
const signupSalary = document.querySelector("#signupSalary");
const signupTelephone = document.querySelector("#signupTelephone");
const signupObser = document.querySelector("#signupObser");
const signupPassword = document.querySelector("#signupPassword");
const signupConfirmPassword = document.querySelector("#signupConfirmPassword");
const sexRadio = document.getElementsByName('sex');
const smokeRadio = document.getElementsByName('smoke');
const healthPlanRadio = document.getElementsByName('planoSaude');
const signUpBtn = document.querySelector("#signUpBtn");

// Login form fields
const loginForm = document.querySelector("#loginForm");
const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");
const loginBtn = document.querySelector("#loginBtn");

// Others
const notification = document.querySelector(".notificationContainer");
const img = document.querySelector("#img");

const formVerification = (user) => {
  let error = false
  let errorNumber = 0

  if (user.email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
    signupEmail.classList.remove('invalid')
  } else {
    errorNumber = 1
  }

  if (user.password != user.confirmPassword) {
    errorNumber = 2
  } else if (user.password.length < 6) {
    errorNumber = 3
  } else {
    signupConfirmPassword.classList.remove("invalid");
    signupPassword.classList.remove("invalid");
  }

  if (user.telephone.length < 16) {
    errorNumber = 4
  } else {
    signupTelephone.classList.remove("invalid");
  }

  if (user.age >= 100 || user.age <= 0) {
    errorNumber = 5
  } else {
    signupAge.classList.remove("invalid");
  }

  switch (errorNumber) {
    case 1:
      messages("Email Invalido", "error");
      signupEmail.classList.add("invalid");
      error = true
      break;

    case 2:
      messages("A senhas não batem", "error");
      signupPassword.classList.add("invalid");
      signupConfirmPassword.classList.add("invalid");
      error = true
      break;

    case 3:
      messages("Sua senha deve possuir ao menos 6 caracteres", "error");
      signupPassword.classList.add("invalid");
      error = true
      break;

    case 4:
      messages("Adicione um telefone válido", "error");
      signupTelephone.classList.add("invalid");
      error = true
      break;

    case 5:
      messages("Idade inválida", "error");
      signupAge.classList.add("invalid");
      error = true
      break;

    default:
      error = false
      break;
  }

  return error
};

const addImg = () => {
  img.style.display = 'block'
  img.src = URL.createObjectURL(imgInput.files[0])
}

const signupButtonDisable = () => {

  let sex
  let smoke
  let healthPlan

  sexRadio.forEach(element => {
    if (element.checked === true) {
      sex = element.value
    }
  })

  smokeRadio.forEach(element => {
    if (element.checked === true) {
      smoke = element.value
    }
  })

  healthPlanRadio.forEach(element => {
    if (element.checked === true) {
      healthPlan = element.value
    }
  })

  if (
    signupName.value === "" ||
    signupEmail.value === "" ||
    signupTelephone.value === "" ||
    signupPassword.value === "" ||
    signupConfirmPassword.value === ""
    &&
    sex === undefined ||
    smoke === undefined ||
    healthPlan === undefined
  ) {
    signUpBtn.setAttribute("disabled", true);
  } else {
    signUpBtn.removeAttribute("disabled");
  }
};

const loginButtonDisable = () => {
  if (loginEmail.value === "" || loginPassword.value === "") {
    loginBtn.setAttribute("disabled", true);
  } else {
    loginBtn.removeAttribute("disabled");
  }
};

const changeForm = (direction) => {
  if (direction === "left") {
    loginForm.style.display = 'flex'
    loginForm.classList.remove("right");
    loginForm.classList.add("left");

    document.body.style.overflowY = 'hidden'
    signUpForm.classList.remove("right2");
    signUpForm.classList.add("left2");
  } else {
    loginForm.classList.remove("left");
    loginForm.classList.add("right");

    document.body.style.overflowY = 'visible'
    signUpForm.classList.remove("right");
    signUpForm.classList.add("right2");
  }
};

const telephoneMask = () => {
  signupTelephone.value = signupTelephone.value.replace(/\D/g, "");
  signupTelephone.value = signupTelephone.value.replace(/^(\d{2})(\d)(\d+)/, "($1) $2 $3");
  signupTelephone.value = signupTelephone.value.replace(/(\d{4})(\d)/, "$1-$2");
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

signUpForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let sex
  let smoke
  let healthPlan

  sexRadio.forEach(element => {
    if (element.checked === true) {
      sex = element.value
    }
  })

  smokeRadio.forEach(element => {
    if (element.checked === true) {
      smoke = element.value
    }
  })

  healthPlanRadio.forEach(element => {
    if (element.checked === true) {
      healthPlan = element.value
    }
  })

  const user = {
    img: imgInput.files[0] || '',
    email: signupEmail.value,
    name: signupName.value,
    age: signupAge.value,
    telephone: signupTelephone.value,
    salary: signupSalary.value,
    obs: signupObser.value || '',
    sex: sex,
    smoke: smoke,
    healthPlan: healthPlan,
    password: signupPassword.value,
    confirmPassword: signupConfirmPassword.value,
  };


  if (formVerification(user) === false) {
    delete user.confirmPassword
    user.telephone = signupTelephone.value.replace(/[^+\d]+/g, "");

    localStorage['user'] = JSON.stringify(user)
    messages('Usuário cadastrado com sucesso', 'success')
    changeForm('left')
  }
})

loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const user = JSON.parse(localStorage['user'])

  const userLogin = {
    email: loginEmail.value,
    password: loginPassword.value
  }

  if (
    userLogin.email === user.email &&
    userLogin.password === user.password
  ) {
    // Substituir a mensagem por uma função de login
    messages("Login correto", "success");
  } else {
    messages("Usuário ou senha incorretos", "error");
  }
})
