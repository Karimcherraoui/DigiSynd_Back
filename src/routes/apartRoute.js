
import { Router} from "express";
import { apartController } from "../controllers/apartController";
import {authenticateToken} from "../middleware/jwt"




const routerApartment = Router();
routerApartment.use(authenticateToken);
routerApartment.get("/", apartController.getAparts);
routerApartment.get("/facture/:id", apartController.getPaymentFacture);
routerApartment.post("/", apartController.createApart);
routerApartment.patch("/pay/:id" ,apartController.updatePaymentStatus);
routerApartment.patch('/:id', apartController.updateApart);
routerApartment.delete('/:id', apartController.deleteApart);
export default routerApartment;


