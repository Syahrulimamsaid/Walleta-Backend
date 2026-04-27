import express  from 'express';
import authMiddleware from '../middleware/auth-middleware';
import authRouter from './auth-routes';
import transRouter from './trans/trans-routes';
import categoryRouter from './category-routes';
import accountRouter from './account-routes';


const publicRouter = express.Router();
publicRouter.use('/auth',authRouter);
publicRouter.use('/trans',authMiddleware, transRouter);
publicRouter.use('/category',authMiddleware, categoryRouter);
publicRouter.use('/account',authMiddleware, accountRouter);

export { publicRouter };