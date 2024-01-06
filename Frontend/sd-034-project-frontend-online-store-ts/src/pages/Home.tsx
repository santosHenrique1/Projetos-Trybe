import { useState, useEffect, FormEvent } from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import CategoryList from '../components/CategoryList';
import { CategoryType, ProductType } from '../types';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';

type HomeProps = {
  handleAddInCart: (product: ProductType) => void
};

function Home({ handleAddInCart }: HomeProps) {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [productList, setProductList] = useState<ProductType[]>([]);

  useEffect(() => {
    getCategories().then((response) => setCategories(response));
  }, []);

  const getProducts = () => {
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    const query = searchInput ? searchInput.value : '';

    const categoryInput = document.querySelector('input[name="category"]:checked');
    const categoryId = categoryInput ? categoryInput.id : '';

    getProductsFromCategoryAndQuery(categoryId, query).then((response) => {
      setProductList(response.results);
    });
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    getProducts();
  };

  const handleCategoryChange = () => {
    getProducts();
  };

  return (
    <main>
      <Cart />
      <p data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
      <form onSubmit={ handleFormSubmit }>
        <input
          data-testid="query-input"
          type="text"
          name="query"
          id="searchInput"
        />
        <button data-testid="query-button">
          Buscar
        </button>
      </form>
      <CategoryList
        categories={ categories }
        handleCategoryChange={ handleCategoryChange }
      />
      <ProductList productList={ productList } handleAddInCart={ handleAddInCart } />
    </main>
  );
}

export default Home;
