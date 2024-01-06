import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../componetens/Loading';

function Login() {
  const [load, setLoad] = useState(false);
  const [button, setButton] = useState(true);
  const [name, setName] = useState('');
  const navigate = useNavigate();
  function handleButton(event: any) {
    setName(event.target.value);
    if (name.length >= 2) {
      setButton(false);
    } else {
      setButton(true);
    }
  }

  async function handleInput() {
    setLoad(true);
    await createUser({ name });
    setLoad(false);
    navigate('/search');
  }
  return (
    <div>
      { load ? <Loading /> : (

        <form>
          <label>
            Nome
            <input
              value={ name }
              type="text"
              onChange={ (event) => handleButton(event) }
              data-testid="login-name-input"
              placeholder="Nome"
            />
          </label>
          <button
            disabled={ button }
            onClick={ handleInput }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>

      ) }

    </div>
  );
}
export default Login;
