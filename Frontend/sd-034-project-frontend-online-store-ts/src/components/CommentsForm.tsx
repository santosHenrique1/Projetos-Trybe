import { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import { addComment, getComment } from '../services/localStorage';
import { CommentsLoaded } from './CommentsLoaded';

type ObjectType = {
  email: string,
  text: string,
  rating: string,
};

const formObjSchema = {
  email: '',
  text: '',
  rating: '',
};

/* Misturei duas tipagem para utilizar no input e no textarea sem dar conflito! - Noemi */
type InputChangeEvent = ChangeEvent<HTMLInputElement>;
type TextAreaChangeEvent = ChangeEvent<HTMLTextAreaElement>;

type ChangeEventType = InputChangeEvent | TextAreaChangeEvent;

type ButtonChangeType = React.MouseEvent<HTMLButtonElement>;

export function CommentsForm() {
  const [inputValidation, setInputValidation] = useState(false);
  const { productId } = useParams();
  const [formObject, setFormObject] = useState<ObjectType>(formObjSchema);
  const cleanForm = () => {
    const radioButtons = document
      .querySelectorAll<HTMLInputElement>('input[type="radio"]');

    radioButtons.forEach((radio) => {
      radio.checked = false;
    });

    setFormObject(formObjSchema);
    setInputValidation(false);
  };

  const handleChange = (e:ChangeEventType) => {
    const { name, value } = e.target;

    setFormObject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = (e: ButtonChangeType) => {
    e.preventDefault();
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formObject.email) || !formObject.rating) {
      return (
        setInputValidation(true)
      );
    }
    if (productId) addComment(formObject, productId);
    cleanForm();
  };
  /* Futuramente Botamos em um subcomponente esse form - Noemi */
  return (
    <div>
      <form>
        <input
          type="email"
          name="email"
          placeholder="Email"
          data-testid="product-detail-email"
          onChange={ (e) => handleChange(e) }
          value={ formObject.email }
        />
        <div>
          <input
            value={ 1 }
            name="rating"
            id="star1"
            type="radio"
            data-testid="1-rating"
            onChange={ (e) => handleChange(e) }
          />
          <label htmlFor="star1">&#9733;</label>
          <input
            name="rating"
            value={ 2 }
            id="star2"
            type="radio"
            data-testid="2-rating"
            onChange={ (e) => handleChange(e) }
          />
          <label htmlFor="star2">&#9733;</label>
          <input
            name="rating"
            value={ 3 }
            id="star3"
            type="radio"
            data-testid="3-rating"
            onChange={ (e) => handleChange(e) }
          />
          <label htmlFor="star3">&#9733;</label>
          <input
            name="rating"
            value={ 4 }
            id="star4"
            type="radio"
            data-testid="4-rating"
            onChange={ (e) => handleChange(e) }
          />
          <label htmlFor="star4">&#9733;</label>
          <input
            value={ 5 }
            name="rating"
            id="star5"
            type="radio"
            data-testid="5-rating"
            onChange={ (e) => handleChange(e) }
          />
          <label htmlFor="star5">&#9733;</label>
        </div>
        <textarea
          name="text"
          value={ formObject.text }
          data-testid="product-detail-evaluation"
          id="message"
          rows={ 4 }
          cols={ 5 }
          onChange={ (e) => handleChange(e) }
        />
        <label htmlFor="message">Mensagem(opcional)</label>
        <button
          onClick={ (e) => handleClick(e) }
          data-testid="submit-review-btn"
        >
          Avaliar

        </button>
      </form>
      {inputValidation && <p data-testid="error-msg">Campos inválidos</p>}
      { productId && getComment(productId).map(({ email, rating, text }, index) => (
        <CommentsLoaded key={ index } email={ email } rating={ rating } text={ text } />
      )) }
    </div>
  );
}
