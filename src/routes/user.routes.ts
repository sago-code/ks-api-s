import { Router } from "express";
import { createUser } from "../controllers/user.controller";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

router.post('/', asyncHandler(createUser));

export default router;