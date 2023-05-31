import express from "express";
import {
  getMoods,
  getMoodById,
  createMood,
  updateMood,
  deleteMood
} from "../controllers/Moods.js";
import { verifyUser, userBev } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/moods',verifyUser, userBev, getMoods);
router.get('/moods/:id',verifyUser, userBev, getMoodById);
router.post('/moods',verifyUser, userBev, createMood);
router.patch('/moods/:id',verifyUser, userBev, updateMood);
router.delete('/moods/:id',verifyUser, userBev, deleteMood);

export default router;