import { Link } from 'react-router-dom';
import imgDrink from '../../images/drinkIcon.svg';
import imgMeal from '../../images/mealIcon.svg';
import './Footer.css';

export function Footer() {
  return (
    <div className="container-footer">
      <footer data-testid="footer" className="footer">
        <Link to="/drinks">
          <img src={ imgDrink } alt="imageDrink" data-testid="drinks-bottom-btn" />
        </Link>
        <Link to="/meals">
          <img src={ imgMeal } alt="imageDrink" data-testid="meals-bottom-btn" />
        </Link>
      </footer>
    </div>
  );
}
export default Footer;
