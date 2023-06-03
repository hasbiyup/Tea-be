import Bev from "../models/BevModel.js";
import User from "../models/UserModel.js";
import Mood from "../models/MoodModel.js";

export const getBevs = async (req, res) => {
    try {
        let response;
            response = await Bev.findAll({
                attributes: ['uuid', 'name', 'price', 'ings', 'img', 'highlight', 'brew', 'desc', 'type'],
                include: [
                    {
                        model: User,
                        attributes: ['name']
                    },
                    {
                        model: Mood,
                        attributes: ['type'],
                        through: { attributes: [] }
                    }
            ]
            });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
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
                attributes: ['uuid', 'name', 'price', 'ings', 'img', 'highlight', 'brew', 'desc', 'type'],
                where: {
                    id: bev.id
                },
                include: [
                    {
                    model: User,
                    attributes: ['name', 'email']
                    },
                    {
                    model: Mood,
                    attributes: ['type'],
                    through: { attributes: [] }
                    }
            ]
            });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createBev = async (req, res) => {
    const { name, price, ings, img, highlight, brew, desc, type, moods } = req.body;
    try {
        const createdBev = await Bev.create({
            name: name,
            price: price,
            ings: ings,
            img: img,
            highlight: highlight,
            brew: brew,
            desc: desc,
            type: type,
            userId: req.userId
        });
        if (moods && moods.length > 0) {
            const foundMoods = await Mood.findAll({
                where: {
                    type: moods
                }
            });
            
            if (foundMoods.length > 0) {
                await createdBev.addMoods(foundMoods);
            }
        }
        res.status(201).json({ msg: "Bev Created Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
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
        const {  name, price, ings, img, highlight, brew, desc, type, moods } = req.body;
            await Bev.update({ name, price, ings, img, highlight, brew, desc, type },{
                where: {
                    id: bev.id
                }
            });
            await bev.setMoods([]);
            if (moods && moods.length > 0) {
                const foundMoods = await Mood.findAll({
                    where: {
                        type: moods
                    }
                });
                
                if (foundMoods.length > 0) {
                    await bev.addMoods(foundMoods);
                }
            }
        res.status(200).json({msg: "Bev updated succesfully"});
    } catch (error) {
        res.status(500).json({ msg: error.message });
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
        await bev.setMoods([]);
            await Bev.destroy({
                where: {
                    id: bev.id
                }
            });
        res.status(200).json({msg: "Bev deleted succesfully"});
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}