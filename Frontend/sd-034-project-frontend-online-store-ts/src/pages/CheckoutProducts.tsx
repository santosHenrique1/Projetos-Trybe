import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductType } from '../types';

function CheckoutProducts() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [cartProducts] = useState(state);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userInfos, setUserInfos] = useState({
    name: '',
    CPF: '',
    email: '',
    tel: '',
    CEP: '',
    address: '',
    payMethod: '',
  });

  const [xablau, setXablau] = useState<boolean | string>(' ');

  useEffect(() => {
    cartProducts.map((product: ProductType) => setTotalPrice((prev) => (
      product.price * product.quantity) + prev));
  }, [cartProducts]);

  const handleInput = ({ target: { name, value } }: any) => {
    setUserInfos((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkoutBtn = () => {
    const isValid = !Object.values(userInfos).some((element) => element.length === 0);
    console.log(console.log(isValid));
    setXablau(isValid);
    if (isValid) {
      navigate('/');
      localStorage.clear();
    }
    console.log(state);
  };

  return (
    <main>
      <section>
        <h4>Revise seus Produtos</h4>
        <ul>
          {cartProducts.map((product: ProductType) => (
            <li key={ product.id }>
              <img src={ product.thumbnail } alt={ product.title } />
              <span>{product.title}</span>
              <span>
                R$
                {product.price * product.quantity}
              </span>
              <span>
                Quantidade:
                {product.quantity}
              </span>
            </li>
          ))}
        </ul>
        <h4>
          Total: R$
          {totalPrice.toFixed(2)}
        </h4>
      </section>
      <section>
        <h4>Informações do Comprador</h4>
        <input
          type="text"
          placeholder="Nome Completo"
          name="name"
          onChange={ handleInput }
          data-testid="checkout-fullname"
        />
        <input
          type="text"
          name="CPF"
          onChange={ handleInput }
          placeholder="CPF"
          data-testid="checkout-cpf"
        />
        <input
          type="email"
          onChange={ handleInput }
          name="email"
          placeholder="Email"
          data-testid="checkout-email"
        />
        <input
          onChange={ handleInput }
          type="tel"
          name="tel"
          placeholder="Telefone"
          data-testid="checkout-phone"
        />
        <input
          type="text"
          onChange={ handleInput }
          name="CEP"
          placeholder="CEP"
          data-testid="checkout-cep"
        />
        <input
          type="text"
          onChange={ handleInput }
          name="address"
          placeholder="Endereço"
          data-testid="checkout-address"
        />
        <input
          type="text"
          name="complement"
          placeholder="Complemento"
        />
        <input
          type="text"
          name="number"
          placeholder="Número"
        />
        <input
          type="text"
          name="city"
          placeholder="Cidade"
        />
        <select name="Estado">
          <option>Estado</option>
        </select>
      </section>
      <section>
        <h4>Método de Pagamento</h4>
        <label>
          <span>Boleto</span>
          <input
            type="radio"
            onChange={ handleInput }
            name="payMethod"
            value="ticket-payment"
            data-testid="ticket-payment"
          />
        </label>
        <label>
          <label>
            <input
              onChange={ handleInput }
              type="radio"
              name="payMethod"
              value="Visa"
              data-testid="visa-payment"
            />
            <span>Visa</span>
          </label>
          <label>
            <input
              onChange={ handleInput }
              type="radio"
              name="payMethod"
              value="MasterCard"
              data-testid="master-payment"
            />
            <span>MasterCard</span>
          </label>
          <label>
            <input
              type="radio"
              onChange={ handleInput }
              name="payMethod"
              value="Elo"
              data-testid="elo-payment"
            />
            <span>Elo</span>
          </label>
        </label>
      </section>
      <button
        type="button"
        data-testid="checkout-btn"
        onClick={ checkoutBtn }
      >
        Comprar
      </button>
      {!xablau && (
        <h4 data-testid="error-msg">Campos inválidos</h4>
      )}
    </main>
  );
}

export default CheckoutProducts;
