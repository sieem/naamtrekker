import { Router } from "express";
import { getName, takeName } from "./controllers/nameController";
import { verifyToken } from "./middleware/authMiddleware";
const router = Router();


router.get('/name', verifyToken, getName);
router.post('/name', takeName);

export { router };