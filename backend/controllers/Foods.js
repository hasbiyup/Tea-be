import Food from "../models/FoodModel.js";
import User from "../models/UserModel.js";

export const getFoods = async (req, res) => {
    try {
        let response;
            response = await Food.findAll({
                attributes: ['uuid', 'name', 'price', 'ings', 'img'],
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.massage });
    }
}

export const getFoodById = async (req, res) => {
    try {
        const food = await Food.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!food) return res.status(404).json({ msg: "Data tidak ditemukan" })
        let response;
            response = await Food.findOne({
                attributes: ['uuid', 'name', 'price', 'ings', 'img'],
                where: {
                    id: food.id
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.massage });
    }
}

export const createFood = async (req, res) => {
    const { name, price, ings, img} = req.body;
    try {
        await Food.create({
            name: name,
            price: price,
            ings: ings,
            img: img,
            userId: req.userId
        });
        res.status(201).json({ msg: "Food Created Successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.massage });
    }

}

export const updateFood = async (req, res) => {
    try {
        const food = await Food.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!food) return res.status(404).json({ msg: "Data tidak ditemukan" })
        const { name, price, ings, img} = req.body;
            await Food.update({ name, price, ings, img},{
                where: {
                    id: food.id
                }
            });
        res.status(200).json({msg: "Food updated succesfully"});
    } catch (error) {
        res.status(500).json({ msg: error.massage });
    }
}

export const deleteFood = async(req, res) => {
    try {
        const food = await Food.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!food) return res.status(404).json({ msg: "Data tidak ditemukan" })
            await Food.destroy({
                where: {
                    id: food.id
                }
            });
        res.status(200).json({msg: "Food deleted succesfully"});
    } catch (error) {
        res.status(500).json({ msg: error.massage });
    }
}