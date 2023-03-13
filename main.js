const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const registerLink = document.getElementById('register-link');
const loginLink = document.querySelector('#login-link');
const errorMessage = document.querySelector('#error-message');
const registerErrorMessage = document.querySelector('#register-error-message');
const loginContainer = document.querySelector('.login-container');
const registerContainer = document.querySelector('.register-container');



if (window.history && window.history.pushState) {
  window.history.pushState('', '', window.location.href);

  window.addEventListener('popstate', function () {
    window.history.pushState('', '', window.location.href);
  });
}


// toggle between login and register forms
registerLink.addEventListener('click', () => {
  loginContainer.classList.add('hidden');
  registerContainer.classList.remove('hidden');
});

loginLink.addEventListener('click', () => {
  registerContainer.classList.add('hidden');
  loginContainer.classList.remove('hidden');
});

// handle login form submission
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;
  try {
    const response = await fetch('https://bumblebee-b374.onrender.com/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    localStorage.setItem('token', data.token);
    if(data.token == null){
      errorMessage.textContent = 'Incorrect email or password!';
    }
    else{
      window.location.href = 'home.html';
    }
  } catch (err) {
    errorMessage.textContent = 'Incorrect email or password!';
  }
});

// handle registration form submission
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const firstName = registerForm.firstName.value;
  const lastName = registerForm.lastName.value;
  const email = registerForm.email.value;
  const password = registerForm.password.value;

  try {
    const response = await fetch('https://bumblebee-b374.onrender.com/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstName, lastName, email, password })
    });
    const data = await response.json();
    localStorage.setItem('token', data.token);
    window.location.href = 'home.html';
  } catch (err) {
    registerErrorMessage.textContent = 'Failed to register';
  }
});

const logoutForm = document.querySelector('#logout-form');
const logoutBtn = document.getElementById('logout-btn');

logoutForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  alert('salam');
  logout();
});

function logout() {
  fetch("https://bumblebee-b374.onrender.com/api/v1/auth/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        localStorage.removeItem("token");
        window.location.href = "index.html";
      }
    })
    .catch((err) => console.log(err));
}

