import '@babel/polyfill';

import { login, logout } from './login';

import { signUp } from './signUp';

const element = (name) => document.getElementById(name).value;

import { updateSettings } from './updateSettings';

const loginForm = document.querySelector('.form--login');

const logoutBtn = document.querySelector('.nav__el--logout');

const updateBtn = document.querySelector('.form-user-data');

const passwordForm = document.querySelector('.form-user-settings');

const passwordBtn = document.querySelector('.btn--update-password');

const signupForm = document.querySelector('.form--signup');

if (passwordForm) {
  passwordForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    passwordBtn.textContent = 'Updating...';

    const Oldpassword = document.getElementById('password-current').value;

    const password = document.getElementById('password').value;

    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateSettings(
      { Oldpassword, password, passwordConfirm },
      'password'
    );

    passwordBtn.textContent = 'Save password';

    document.getElementById('password-current').value = '';

    document.getElementById('password').value = '';

    document.getElementById('password-confirm').value = '';
  });
}

if (updateBtn) {
  updateBtn.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append('name', document.getElementById('name').value);

    form.append('email', document.getElementById('email').value);

    form.append('photo', document.getElementById('photo').files[0]);

    // const name = document.getElementById('name').value;

    // const email = document.getElementById('email').value;

    // console.log(name , email , photo)

    updateSettings(form, 'data');
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;

    const password = document.getElementById('password').value;

    login(email, password);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

if (signupForm) {
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = element('name');

    const email = element('email');

    const password = element('password');

    const passwordConfirm = element('passwordConfirm');

    signUp(name, email, password, passwordConfirm);
  });
}
