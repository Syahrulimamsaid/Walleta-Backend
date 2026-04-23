import express  from 'express';
import authController from '../controller/auth-controller';
import authMiddleware from '../middleware/auth-middleware';

const authRouter = express.Router();
authRouter.post('/login', authController.login);
authRouter.get('/logked', authController.logked);

export default authRouter;
