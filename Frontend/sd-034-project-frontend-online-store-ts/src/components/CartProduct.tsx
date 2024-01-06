import { useState } from 'react';
import { getCart, setCart } from '../services/localStorage';

type CartProductProps = {
  id: string,
  thumbnail: string,
  title: string,
  price: number,
  productInCart: (p: any) => void;
};

function CartProduct({ thumbnail, title, price, id, productInCart }: CartProductProps) {
  const [quantity, setQuantity] = useState(1);
  function heandleButton(event: any) {
    const { name } = event.target;
    if (name === 'increase') {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
    }
  }
  function removeProduct() {
    const cartProducts = getCart();
    const filterPoducts = cartProducts.filter(
      (product: CartProductProps) => product.id !== id,
    );
    productInCart(filterPoducts);
    setCart(filterPoducts);
  }
  return (
    <div>
      <img src={ thumbnail } alt={ title } />
      <p data-testid="shopping-cart-product-name">{title}</p>
      <button
        name="decrease"
        data-testid="product-decrease-quantity"
        type="button"
        onClick={ heandleButton }
      >
        -

      </button>
      <p data-testid="shopping-cart-product-quantity">
        <strong>{quantity}</strong>
      </p>
      <button
        name="increase"
        data-testid="product-increase-quantity"
        type="button"
        onClick={ heandleButton }
      >
        +

      </button>
      <p>{price * quantity}</p>
      <button
        onClick={ removeProduct }
        type="button"
        data-testid="remove-product"
      >
        Remover

      </button>
    </div>

  );
}
export default CartProduct;
