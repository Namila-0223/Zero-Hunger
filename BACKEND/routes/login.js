import { Router } from "express";

import { handleLogin } from '../controllers/authController';
import { createUser } from '../controllers/registerController';

const router=Router();

router.post("/login",handleLogin)
router.post("/register",createUser)

export default router;
