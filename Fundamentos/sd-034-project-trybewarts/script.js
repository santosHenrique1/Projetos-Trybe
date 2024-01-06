const form = document.querySelector('.trybewarts-login');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = form.email.value;
  const password = form.password.value;

  if (email === 'tryber@teste.com' && password === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }

  form.reset();
});

const validadeSub = () => {
  const button = document.getElementById('submit-btn');
  button.disabled = true;
  button.style.backgroundColor = 'red';
  const checkbox = document.getElementById('agreement');
  checkbox.addEventListener('click', () => {
    if (checkbox.checked) {
      button.disabled = false;
      button.style.backgroundColor = 'green';
    } else {
      button.disabled = true;
      button.style.backgroundColor = 'red';
    }
  });
};

validadeSub();
