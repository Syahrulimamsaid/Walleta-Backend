import express  from 'express';
import authMiddleware from '../middleware/auth-middleware';
import authRouter from './auth-routes';
import transRouter from './trans/trans-routes';


const publicRouter = express.Router();
publicRouter.use('/auth',authRouter);
publicRouter.use('/trans',authMiddleware, transRouter);

export { publicRouter };