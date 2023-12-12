
import { Router} from "express";
import { apartController } from "../controllers/apartController";
import {authenticateToken} from "../middleware/jwt"




const routerApartment = Router();
routerApartment.get("/", apartController.getAparts);
// routerApartment.use(authenticateToken);
routerApartment.post("/", apartController.createApart);
// routerApartment.patch("/pay/:id" ,ApartController.payApart);
routerApartment.patch('/:id', apartController.updateApart);
routerApartment.delete('/:id', apartController.deleteApart);
export default routerApartment;


