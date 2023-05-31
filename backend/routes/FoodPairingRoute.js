import express from "express";
import {
  getFoodPairings,
  getFoodPairingById,
  createFoodPairing,
  updateFoodPairing,
  deleteFoodPairing
} from "../controllers/FoodPairings.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/foodPairings', verifyUser, getFoodPairings);
router.get('/foodPairings/:id', verifyUser, getFoodPairingById);
router.post('/foodPairings', verifyUser, createFoodPairing);
router.patch('/foodPairings/:id', verifyUser, updateFoodPairing);
router.delete('/foodPairings/:id', verifyUser, deleteFoodPairing);

export default router;