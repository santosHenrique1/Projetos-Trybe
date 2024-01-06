import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

export default function Login() {
  const [validation1, setValidation1] = useState<boolean>(true);
  const [validation2, setValidation2] = useState<string>('');
  const [validation3, setValidation3] = useState<string>('');
  const navigate = useNavigate();
  useEffect(() => {
    const validacao = () => {
      if (validation3.length > 6 && validator.isEmail(validation2)) {
        setValidation1(false);
      } else {
        setValidation1(true);
      }
    };
    validacao();
  }, [validation2, validation3]);
  const entrar = () => {
    localStorage.setItem('user', JSON.stringify({ email: validation2 }));
    navigate('/meals');
  };
  return (
    <form>
      <input
        data-testid="email-input"
        type="email"
        onChange={ (a) => setValidation2(a.target.value) }
      />
      <input
        data-testid="password-input"
        type="password"
        onChange={ (a) => setValidation3(a.target.value) }
      />
      <button
        onClick={ () => entrar() }
        data-testid="login-submit-btn"
        disabled={ validation1 }
      >
        Enter

      </button>
    </form>
  );
}
