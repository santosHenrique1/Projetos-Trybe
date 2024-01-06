import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import CartItems from './components/CartItems';
import { ProductType } from './types';
import { addToCart } from './services/localStorage';
import CheckoutProducts from './pages/CheckoutProducts';

function App() {
  const handleAddInCart = (product: ProductType) => {
    addToCart(product);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={ <Home handleAddInCart={ handleAddInCart } /> }
      />
      <Route
        path="/cart"
        Component={ CartItems }
      />
      <Route
        path="/product/:productId"
        element={ <Product handleAddInCart={ handleAddInCart } /> }
      />
      <Route
        path="/checkout"
        element={ <CheckoutProducts /> }
      />
    </Routes>
  );
}

export default App;
