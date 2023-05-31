import Bev from "../models/BevModel.js";
import User from "../models/UserModel.js";

export const getBevs = async (req, res) => {
    try {
        let response;
            response = await Bev.findAll({
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

export const getBevById = async (req, res) => {
    try {
        const bev = await Bev.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!bev) return res.status(404).json({ msg: "Data tidak ditemukan" })
        let response;
            response = await Bev.findOne({
                attributes: ['uuid', 'name', 'price', 'ings', 'img'],
                where: {
                    id: bev.id
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

export const createBev = async (req, res) => {
    const { name, price, ings, img} = req.body;
    try {
        await Bev.create({
            name: name,
            price: price,
            ings: ings,
            img: img,
            userId: req.userId
        });
        res.status(201).json({ msg: "Bev Created Successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.massage });
    }

}

export const updateBev = async (req, res) => {
    try {
        const bev = await Bev.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!bev) return res.status(404).json({ msg: "Data tidak ditemukan" })
        const { name, price, ings, img} = req.body;
            await Bev.update({ name, price, ings, img},{
                where: {
                    id: bev.id
                }
            });
        res.status(200).json({msg: "Bev updated succesfully"});
    } catch (error) {
        res.status(500).json({ msg: error.massage });
    }
}

export const deleteBev = async(req, res) => {
    try {
        const bev = await Bev.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!bev) return res.status(404).json({ msg: "Data tidak ditemukan" })
            await Bev.destroy({
                where: {
                    id: bev.id
                }
            });
        res.status(200).json({msg: "Bev deleted succesfully"});
    } catch (error) {
        res.status(500).json({ msg: error.massage });
    }
}