import { Link } from 'react-router-dom';
import { ProductType } from '../types';

type ProductListProps = {
  productList: ProductType[],
  handleAddInCart: (product: ProductType) => void
};

function ProductList({ productList, handleAddInCart }: ProductListProps) {
  return (
    <section>
      {
        productList.map((product) => (
          <div
            key={ product.id }
            data-testid="product"
          >
            <Link data-testid="product-detail-link" to={ `/product/${product.id}` }>
              <img src={ product.thumbnail } alt={ product.title } />
              <h4>{product.title}</h4>
              <p>{product.price}</p>
            </Link>
            <button
              data-testid="product-add-to-cart"
              onClick={ () => handleAddInCart(product) }
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))
      }
    </section>
  );
}

export default ProductList;
