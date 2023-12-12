import { Router } from "express"
import apartmentRoute from "./apartRoute"
import AuthRoutes from "./authRoute"

import { json } from "express"; 


const router  =  Router();
router.use(json())
router.use("/admin", AuthRoutes);
router.use("/apartment" , apartmentRoute)

export default router