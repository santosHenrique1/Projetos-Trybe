import { useState } from 'react';

type CreateIngredientProps = {
  ingredient: string | null;
  index: number;
  checked: false | true;
  id: string;
  addedIngredients: boolean[];
  setAddedIngredients: React.Dispatch<React.SetStateAction<boolean[]>>;
};

function CreateIngredient({
  ingredient,
  index, checked,
  id,
  addedIngredients,
  setAddedIngredients,
}: CreateIngredientProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const onChange = () => {
    setIsChecked(!isChecked);
    const remake = addedIngredients.map((a, i) => (i === index ? !a : a));
    setAddedIngredients(remake);
    localStorage.setItem(`${id}`, JSON.stringify(remake));
  };

  return (
    <div>
      <label
        key={ index }
        data-testid={ `${index}-ingredient-step` }
        className={ isChecked ? 'checked' : '' }
      >
        <input type="checkbox" onChange={ onChange } checked={ isChecked } />
        { ingredient }
      </label>
    </div>
  );
}

export default CreateIngredient;
