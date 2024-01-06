import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { emailAction } from '../redux/actions/index';

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [btnEnable, setBtnEnable] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function validateEmail() {
    const regexEmail = /\S+@\S+\.\S+/;
    return regexEmail.test(email);
  }
  function validatePassword() {
    return password.length > 4;
  }
  function handleChangeEmail(event:any) {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setBtnEnable(validateEmail() && validatePassword());
  }
  function handleChangePassword(event:any) {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setBtnEnable(validateEmail() && validatePassword());
  }
  function handleSubmit(event:any) {
    event.preventDefault();
    dispatch(emailAction(email));
    navigate('/carteira');
  }
  return (
    <div>
      <h1> Login </h1>
      <form onSubmit={ (event) => handleSubmit(event) }>
        <label>
          Email
          <input
            type="email"
            data-testid="email-input"
            placeholder="example@example.com"
            onChange={ (event) => handleChangeEmail(event) }
            value={ email }
          />
        </label>
        <label>
          Senha
          <input
            type="password"
            data-testid="password-input"
            placeholder="password"
            onChange={ (event) => handleChangePassword(event) }
            value={ password }
          />
        </label>
        <button
          type="submit"
          disabled={ !btnEnable }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
