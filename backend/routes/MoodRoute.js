import express from "express";
import {
  getMoods,
  getMoodById,
  createMood,
  updateMood,
  deleteMood
} from "../controllers/Moods.js";
import { verifyUser, staffBev } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/moods',verifyUser, staffBev, getMoods);
router.get('/moods/:id',verifyUser, staffBev, getMoodById);
router.post('/moods',verifyUser, staffBev, createMood);
router.patch('/moods/:id',verifyUser, staffBev, updateMood);
router.delete('/moods/:id',verifyUser, staffBev, deleteMood);

export default router;