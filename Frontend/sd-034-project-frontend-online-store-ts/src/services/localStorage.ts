import { ProductType, ObjectType } from '../types';

export const getCart = () => {
  return JSON.parse(localStorage.getItem('cart') || '[]');
};

export const setCart = (arrayCart: ProductType[]) => {
  localStorage.setItem('cart', JSON.stringify(arrayCart));
};

export const addToCart = (product: ProductType) => {
  const cart = getCart();
  const itemInCart = cart
    .find((cartProduct: ProductType) => cartProduct.id === product.id);
  if (itemInCart) {
    itemInCart.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }
  setCart(cart);
};

/* Logica requisito 12, avaliação do produto */

export const getComment = (id: string): ObjectType[] => {
  return JSON.parse(localStorage.getItem(id) || '[]');
};

export const addComment = (obj: ObjectType, id: string) => {
  const comments = getComment(id);
  if (comments.length > 0) {
    return localStorage.setItem(id, JSON.stringify([...comments, obj]));
  }
  localStorage.setItem(id, JSON.stringify([obj]));
};
