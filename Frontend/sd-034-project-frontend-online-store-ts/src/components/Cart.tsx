import { Link } from 'react-router-dom';

function Cart() {
  return (
    <button>

      <Link to="/cart" data-testid="shopping-cart-button">
        Carrinho
      </Link>
    </button>
  );
}
export default Cart;
