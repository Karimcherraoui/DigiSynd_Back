import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticateToken = (req, res, next) => {
  const tokenWithBearer = req.headers.authorization;
  if (!tokenWithBearer)
    return res.status(401).json({ error: "Access denied" });
  const [, token] = tokenWithBearer.split(" ");
  
  try {
    if(token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.admin = {
        adminId: decoded.sub,
        fullName : decoded.fullName,
        email: decoded.email,
        role:decoded.role
      };
    }
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};
