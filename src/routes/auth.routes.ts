import { Router } from "express";
import { login, logout, getProfile } from "../controllers/auth.controller";
import { asyncHandler } from "../middleware/asyncHandler";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post('/login', asyncHandler(login));
router.post('/logout', authMiddleware, asyncHandler(logout));
router.get('/profile', authMiddleware, asyncHandler(getProfile));

// Ejemplo de ruta protegida por rol
router.get('/admin', authMiddleware, roleMiddleware(['admin']), (req, res) => {
    res.json({ message: 'Ruta de administrador' });
});

export default router;