import { Router } from "express";
import { login } from "./controllers/loginController";
import { seeName, getNames } from "./controllers/nameController";
import { verifyToken } from "./middleware/authMiddleware";
const router = Router();

router.get('/names', getNames);
router.get('/name', verifyToken, seeName);
router.post('/login', login);

export { router };