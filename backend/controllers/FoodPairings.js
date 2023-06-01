import FoodPairings from "../models/FoodPairingModel.js";
import Food from "../models/FoodModel.js";
import User from "../models/UserModel.js";
import Bev from "../models/BevModel.js";

export const getFoodPairings = async (req, res) => {
  try {
    const response = await FoodPairings.findAll({
      attributes: [],
      include: [
        {
          model: User,
          attributes: ['name', 'email']
        },
        {
            model: Bev,
            attributes: ['uuid', 'name', 'price', 'ings', 'img', 'highlight', 'brew', 'desc']
          },
        {
          model: Food,
          attributes: ['uuid', 'name', 'price', 'ings', 'img', 'desc']
        }
      ]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getFoodPairingById = async (req, res) => {
    try {
      const pairing = await FoodPairings.findOne({
        where: {
          uuid: req.params.id
        },
        include: [
          {
            model: User,
            attributes: ['name', 'email']
          },
          {
            model: Bev,
            attributes: ['uuid', 'name', 'price', 'ings', 'img', 'highlight', 'brew', 'desc']
          },
          {
            model: Food,
            attributes: ['uuid', 'name', 'price', 'ings', 'img', 'desc']
          }
        ]
      });
  
      if (!pairing) return res.status(404).json({ msg: "Data tidak ditemukan" });
  
      res.status(200).json(pairing);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

export const createFoodPairing = async (req, res) => {
  const { foodId, bevId } = req.body;
  try {
    await FoodPairings.create({
      userId: req.userId,
      bevId: bevId,
      foodId: foodId
    });
    res.status(201).json({ msg: "Food Pairing Created Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateFoodPairing = async (req, res) => {
  try {
    const pairing = await FoodPairings.findOne({
      where: {
        uuid: req.params.id
      }
    });
    if (!pairing) return res.status(404).json({ msg: "Data tidak ditemukan" });

    const { userId, foodId, bevId } = req.body;

    await FoodPairings.update(
      {
        userId: userId,
        bevId: bevId,
        foodId: foodId
      },
      {
        where: {
          id: pairing.id
        }
      }
    );

    res.status(200).json({ msg: "Food Pairing Updated Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteFoodPairing = async (req, res) => {
  try {
    const pairing = await FoodPairings.findOne({
      where: {
        uuid: req.params.id
      }
    });
    if (!pairing) return res.status(404).json({ msg: "Data tidak ditemukan" });
    await FoodPairings.destroy({
      where: {
        id: pairing.id
      }
    });
    res.status(200).json({ msg: "Food Pairing Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
