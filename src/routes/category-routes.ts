import express  from "express";
import categoryController from "../controller/category-controller";

const categoryRuter = express.Router();
categoryRuter.get('/', categoryController.get);
categoryRuter.get('/:type', categoryController.get);

export default categoryRuter;