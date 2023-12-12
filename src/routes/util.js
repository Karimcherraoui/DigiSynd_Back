
import { Router} from "express";
import { AdminController, utilController } from "../controllers/adminController";

const routerAdmin = Router();
routerAdmin.get("/", AdminController.getAdmin);


export default routerAdmin;


