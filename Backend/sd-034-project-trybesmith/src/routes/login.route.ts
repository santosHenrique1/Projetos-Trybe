import { Router } from 'express';
import loginContoller from '../controller/login.contoller';
import auth from '../middleware/auth';

const loginRouter = Router();
loginRouter.post('/login', auth.createUser, loginContoller.login);

export default loginRouter;