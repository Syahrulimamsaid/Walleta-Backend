import express  from "express";
import accountController from "../controller/account-controller";

const accountRuter = express.Router();
accountRuter.get('/', accountController.get);

export default accountRuter;