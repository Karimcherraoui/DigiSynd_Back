import { Router } from "express";
import  {AuthController}  from "../controllers/authController";
import { authenticateToken } from "../middleware/jwt";

const router = Router();
router.post("/login", AuthController.login);
router.use(authenticateToken);
router.post("/register", AuthController.register);

export default router;