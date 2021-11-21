import { Router } from "express";
import { seeName, getOwnName } from "./controllers/nameController";
import { verifyGuid } from "./middleware/authMiddleware";
const router = Router();

router.get('/my-name', verifyGuid, getOwnName);
router.get('/chosen-name', verifyGuid, seeName);

export { router };