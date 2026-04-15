import express  from 'express';
import authMiddleware from '../middleware/auth-middleware';
import authRouter from './auth-routes';
import debetRouter from './debet-routes';


const publicRouter = express.Router();
publicRouter.use('/auth',authRouter);
publicRouter.use('/debet',authMiddleware, debetRouter);

export { publicRouter };