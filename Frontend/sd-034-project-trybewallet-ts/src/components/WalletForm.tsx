import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '../Type/types';
import { currenciesThunk, expensesAction } from '../redux/actions';

function WalletForm() {
  const [formControl, setFormControl] = useState({
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
    exchangeRates: '',
  });
  async function apiCurrencies() {
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  }
  const dispatch: Dispatch = useDispatch();
  const currencies = useSelector((state:any) => state.wallet.currencies);

  useEffect(() => {
    dispatch(currenciesThunk());
  }, [dispatch]);

  function handelChangeForm(event:any) {
    const { name, value } = event.target;
    setFormControl({
      ...formControl,
      [name]: value,
    });
  }

  async function saveData() {
    const apiReturn = await apiCurrencies();
    const clone = formControl;
    clone.exchangeRates = apiReturn;
    dispatch(expensesAction(clone));
    setFormControl({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: formControl.id + 1,
      exchangeRates: '',
    });
    console.log(clone);
  }

  return (
    <div>
      <form action="">

        <label htmlFor="">
          {' '}
          Valor:
          <input
            type="number"
            data-testid="value-input"
            value={ formControl.value }
            name="value"
            onChange={ (event) => handelChangeForm(event) }
          />
        </label>
        <label>
          Moeda
          <select
            data-testid="currency-input"
            value={ formControl.currency }
            name="currency"
            id=""
            onChange={ (event) => handelChangeForm(event) }
          >
            {currencies.map((currency: string, index: number) => (
              <option key={ index }>
                {currency}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="">
          Metodo de pagamento
          <select
            onChange={ (event) => handelChangeForm(event) }
            data-testid="method-input"
            name="method"
            id=""
            value={ formControl.method }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="">
          Categoria
          <select
            value={ formControl.tag }
            data-testid="tag-input"
            id=""
            name="tag"
            onChange={ (event) => handelChangeForm(event) }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte </option>
            <option>Saúde</option>
          </select>
        </label>
        <label
          data-testid="description-input"
          htmlFor=""
        >
          Descrição
          <input
            type="text"
            value={ formControl.description }
            name="description"
            onChange={ (event) => handelChangeForm(event) }
          />
        </label>
        <button
          onClick={ () => saveData() }
          type="button"
        >
          Adicionar despesa
        </button>
      </form>

    </div>
  );
}

export default WalletForm;
