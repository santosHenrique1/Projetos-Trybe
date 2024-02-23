import { Router } from 'express';
import product from '../controller/product.controller';
import validateName from '../middleware/nameValidate';
import validatePrice from '../middleware/priceValidate';
import validateUserId from '../middleware/userIdValidate';

const productRouter = Router();

productRouter.get('/products', product.findAllProducts);

productRouter.use(validateName.validateName);
productRouter.use(validateName.validateName2);
productRouter.use(validateUserId.userIdValidate);
productRouter.use(validateUserId.userIdExist);
productRouter.use(validatePrice.validatePrice);

productRouter.post('/products', product.createProduct);

export default productRouter;