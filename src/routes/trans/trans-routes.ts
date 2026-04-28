import express  from "express";
import debetRouter from './debet-routes';
import transController from "../../controller/trans/trans-controller";

const transRuter = express.Router();
transRuter.get('/', transController.get);
transRuter.get('/:id', transController.getById);

transRuter.post('/', transController.create);

transRuter.use('/debet', debetRouter);

export default transRuter;