// validation for sign-up form

document.addEventListener('DOMContentLoaded', () => {
  // elements for signup form
  const signupForm = document.getElementById('signupForm');
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirm = document.getElementById('confirmPassword');

  const usernameError = document.getElementById('usernameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const confirmError = document.getElementById('confirmError');

  // elements for login form
  const loginForm = document.getElementById('loginForm');
  const loginEmail = document.getElementById('loginEmail');
  const loginPassword = document.getElementById('loginPassword');
  const loginEmailError = document.getElementById('loginEmailError');
  const loginPasswordError = document.getElementById('loginPasswordError');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showError(input, messageElem, message) {
    input.classList.add('border', 'border-danger');
    messageElem.textContent = message;
    messageElem.classList.remove('d-none');
  }

  function clearError(input, messageElem) {
    input.classList.remove('border', 'border-danger');
    messageElem.textContent = '';
    messageElem.classList.add('d-none');
  }

  let triedSubmitSignup = false;
  let triedSubmitLogin = false;

  function validateSignup(showAll = true) {
    let valid = true;

    // username required
    if (!username.value.trim()) {
      if (showAll) showError(username, usernameError, 'Username is required');
      valid = false;
    } else {
      clearError(username, usernameError);
    }

    // email required + format
    if (!email.value.trim()) {
      if (showAll) showError(email, emailError, 'Email is required');
      valid = false;
    } else if (!emailPattern.test(email.value)) {
      if (showAll) showError(email, emailError, 'Invalid email format');
      valid = false;
    } else {
      clearError(email, emailError);
    }

    // password required
    if (!password.value) {
      if (showAll) showError(password, passwordError, 'Password is required');
      valid = false;
    } else {
      clearError(password, passwordError);
    }

    // confirm required and must match
    if (!confirm.value) {
      if (showAll) showError(confirm, confirmError, 'Confirmation is required');
      valid = false;
    } else if (confirm.value !== password.value) {
      if (showAll) showError(confirm, confirmError, "Passwords don't match");
      valid = false;
    } else {
      clearError(confirm, confirmError);
    }

    return valid;
  }

  function validateLogin(showAll = true) {
    let valid = true;
    // email required + format
    if (!loginEmail.value.trim()) {
      if (showAll) showError(loginEmail, loginEmailError, 'Email is required');
      valid = false;
    } else if (!emailPattern.test(loginEmail.value)) {
      if (showAll) showError(loginEmail, loginEmailError, 'Invalid email format');
      valid = false;
    } else {
      clearError(loginEmail, loginEmailError);
    }

    // password required
    if (!loginPassword.value) {
      if (showAll) showError(loginPassword, loginPasswordError, 'Password is required');
      valid = false;
    } else {
      clearError(loginPassword, loginPasswordError);
    }

    return valid;
  }

  // submit handlers
  signupForm.addEventListener('submit', (e) => {
    triedSubmitSignup = true;
    if (!validateSignup(true)) {
      e.preventDefault();
    }
  });

  loginForm.addEventListener('submit', (e) => {
    triedSubmitLogin = true;
    if (!validateLogin(true)) {
      e.preventDefault();
    }
  });

  // input listeners for signup
  [username, email, password, confirm].forEach((input) => {
    input.addEventListener('input', () => {
      if (triedSubmitSignup) {
        validateSignup(true);
      }
    });
  });

  // input listeners for login
  [loginEmail, loginPassword].forEach((input) => {
    input.addEventListener('input', () => {
      if (triedSubmitLogin) {
        validateLogin(true);
      }
    });
  });
});
