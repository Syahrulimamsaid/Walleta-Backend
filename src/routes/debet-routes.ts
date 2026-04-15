import express  from "express";
import debetController from "../controller/debet-controller";

const transRuter = express.Router();
transRuter.get('/', debetController.get);
transRuter.post('/', debetController.create);

export default transRuter;