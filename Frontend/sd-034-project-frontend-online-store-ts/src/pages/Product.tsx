import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { ProductType } from '../types';
import { CommentsForm } from '../components/CommentsForm';
import Cart from '../components/Cart';

type ProductProps = {
  handleAddInCart: (product: ProductType) => void
};

function Product({ handleAddInCart }: ProductProps) {
  const [product, setProduct] = useState<ProductType | null>(null);
  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      getProductById(productId).then((response) => setProduct(response));
    }
  }, [productId]);

  if (!product) return;

  return (
    <section>
      <img
        data-testid="product-detail-image"
        src={ product.thumbnail }
        alt={ product.title }
      />
      <h1 data-testid="product-detail-name">{product.title}</h1>
      <p data-testid="product-detail-price">{product.price}</p>
      <button
        data-testid="product-detail-add-to-cart"
        onClick={ () => handleAddInCart(product) }
      >
        Adicionar ao carrinho
      </button>
      <Cart />
      <CommentsForm />
    </section>
  );
}

export default Product;
