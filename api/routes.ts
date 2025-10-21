import { Router } from "express";
import { seeName, getOwnName } from "./controllers/nameController";
import { verifyGuid } from "./middleware/authMiddleware";
import { initYear } from "./controllers/initController";
const router = Router();

router.get('/my-name', verifyGuid, getOwnName);
router.get('/chosen-name', verifyGuid, seeName);
router.post('/init-year', initYear);

export { router };