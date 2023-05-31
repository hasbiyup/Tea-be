import express from "express";
import {
  getFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
} from "../controllers/Foods.js";
import { verifyUser, userFood } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/foods',verifyUser, userFood, getFoods);
router.get('/foods/:id',verifyUser, userFood, getFoodById);
router.post('/foods',verifyUser, userFood, createFood);
router.patch('/foods/:id',verifyUser, userFood, updateFood);
router.delete('/foods/:id',verifyUser, userFood, deleteFood);

export default router;