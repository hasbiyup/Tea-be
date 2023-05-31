import express from "express";
import {
  getFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
} from "../controllers/Foods.js";
import { verifyUser, staffFood } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/foods',verifyUser, staffFood, getFoods);
router.get('/foods/:id',verifyUser, staffFood, getFoodById);
router.post('/foods',verifyUser, staffFood, createFood);
router.patch('/foods/:id',verifyUser, staffFood, updateFood);
router.delete('/foods/:id',verifyUser, staffFood, deleteFood);

export default router;