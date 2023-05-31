import express from "express";
import {
  getBevs,
  getBevById,
  createBev,
  updateBev,
  deleteBev
} from "../controllers/Bevs.js";
import { verifyUser, staffBev } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/bevs', verifyUser, staffBev, getBevs);
router.get('/bevs/:id', verifyUser, staffBev, getBevById);
router.post('/bevs', verifyUser, staffBev, createBev);
router.patch('/bevs/:id', verifyUser, staffBev, updateBev);
router.delete('/bevs/:id', verifyUser, staffBev, deleteBev);

export default router;