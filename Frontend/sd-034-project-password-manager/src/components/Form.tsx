import { useState } from 'react';

function Form() {
  const classValidate1 = ['valid-password-check', 'invalid-password-check'];
  const classValidate2 = ['valid-password-check', 'invalid-password-check'];
  type TypeService = {
    nameService: string,
    login: string,
    password: string,
    url: string,
  };
  const [hidden, setHidden] = useState(false);
  const [formInfo, setFormInfo] = useState({
    nameService: '',
    login: '',
    password: '',
    url: '',
  });
  const [displayForm, setDisplayForm] = useState(false);
  const [services, setServices] = useState<TypeService[]>([]);
  function handleDisplayForm() {
    setDisplayForm(!displayForm);
  }

  function handleBtnCancel() {
    setDisplayForm(false);
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  function validateForm() {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,16}$/;
    return (
      formInfo.nameService !== ''
      && formInfo.login !== ''
      && regex.test(formInfo.password)
      && formInfo.password.length >= 8
      && formInfo.password.length <= 16
    );
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validateForm()) {
      const listServices = {
        nameService: formInfo.nameService,
        login: formInfo.login,
        password: formInfo.password,
        url: formInfo.url,
      };
      setServices([...services, listServices]);
      setFormInfo({
        nameService: '',
        login: '',
        password: '',
        url: '',

      });
      setDisplayForm(false);
    }
  }
  function hiddenPassword() {
    setHidden(!hidden);
  }
  function handleBtnDelete(
    nameService:any,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    const updateServices = [...services];
    updateServices.splice(nameService, 1);
    setServices(updateServices);
  }
  return (
    <div>
      { displayForm ? (
        <form onSubmit={ (e) => handleSubmit(e) }>
          <label>
            Nome do Serviço
            <input
              name="nameService"
              value={ formInfo.nameService }
              onChange={ handleChange }
              type="text"
              placeholder="Nome do Serviço"
            />
          </label>
          <label>
            Login
            <input
              name="login"
              value={ formInfo.login }
              onChange={ handleChange }
              type="text"
              placeholder="Login"
            />
          </label>
          <label>
            Senha
            <input
              name="password"
              value={ formInfo.password }
              onChange={ handleChange }
              type="password"
              placeholder="Senha"
            />
          </label>
          <label>
            URL
            <input
              name="url"
              value={ formInfo.url }
              onChange={ handleChange }
              type="text"
              placeholder="URL"
            />
          </label>
          <button disabled={ !validateForm() }>Cadastrar</button>
          <button onClick={ handleBtnCancel }>Cancelar</button>
          <p
            className={ formInfo.password.length >= 8
              ? classValidate1[0]
              : classValidate1[1] }
          >
            Possuir 8 ou mais caracteres
          </p>
          <p
            className={ formInfo.password.length <= 16
              ? classValidate1[0]
              : classValidate1[1] }
          >
            Possuir até 16 caracteres
          </p>
          <p
            className={ /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,16}$/.test(formInfo.password)
              ? classValidate2[0] : classValidate2[1] }
          >
            Possuir letras e números
          </p>
          <p
            className={ /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,16}$/.test(formInfo.password)
              ? classValidate2[0] : classValidate2[1] }
          >
            Possuir algum caractere especial

          </p>
        </form>
      ) : (
        <button onClick={ handleDisplayForm }>Cadastrar nova senha</button>
      )}
      <div>
        {services.length === 0 ? (
          <p>nenhuma senha cadastrada</p>
        ) : (
          <ul>
            {services.map((service, index) => (
              <div key={ index }>
                <li>
                  <a href={ service.url } target="_blank" rel="noopener noreferrer">
                    {service.nameService}
                  </a>
                  <li>
                    {service.login}
                  </li>
                  <li>
                    {hidden ? '******' : (service.password)}
                  </li>
                  {' '}
                  <button
                    onClick={ (e) => handleBtnDelete(service.nameService, e) }
                    data-testid="remove-btn"
                  >
                    Delete
                  </button>
                  {' '}
                </li>
                <label>
                  Esconder senhas
                  <input type="checkbox" onClick={ hiddenPassword } />
                </label>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
export default Form;
