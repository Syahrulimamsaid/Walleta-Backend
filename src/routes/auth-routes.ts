import express  from 'express';
import authController from '../controller/auth-controller';

const authRouter = express.Router();
authRouter.post('/login', authController.login);

export default authRouter;
