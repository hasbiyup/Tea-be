import express from "express";
import {
  getBevs,
  getBevById,
  createBev,
  updateBev,
  deleteBev
} from "../controllers/Bevs.js";
import { verifyUser, userBev } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/bevs', verifyUser, userBev, getBevs);
router.get('/bevs/:id', verifyUser, userBev, getBevById);
router.post('/bevs', verifyUser, userBev, createBev);
router.patch('/bevs/:id', verifyUser, userBev, updateBev);
router.delete('/bevs/:id', verifyUser, userBev, deleteBev);

export default router;