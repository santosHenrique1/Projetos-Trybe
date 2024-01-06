import img2 from '../images/searchIcon.svg';

export default function Form({ setToogle, toogle, setRecipes, recepes }:any) {
  const onClick = () => {
    setRecipes(!recepes);
    setToogle(!toogle);
  };

  return (
    <button onClick={ onClick } data-testid="search">
      <img
        data-testid="search-top-btn"
        src={ img2 }
        alt="searchIcon"
      />
    </button>
  );
}
