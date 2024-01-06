import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductType } from '../types';
import CartProduct from './CartProduct';

function CartItems() {
  const [productsInCart, setProductsInCart] = useState<ProductType[]>([]);

  useEffect(() => {
    setProductsInCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  return (
    <section>
      {productsInCart.length ? (
        <div>
          {productsInCart.map((product) => (
            <CartProduct
              key={ product.id }
              title={ product.title }
              thumbnail={ product.thumbnail }
              price={ product.price }
              id={ product.id }
              productInCart={ setProductsInCart }
            />
          ))}
          <Link to="/checkout/" state={ productsInCart }>
            <button
              type="button"
              data-testid="checkout-products"
            >
              Finalizar Compra
            </button>
          </Link>
        </div>
      ) : (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      )}
    </section>
  );
}

export default CartItems;
