import Mood from "../models/MoodModel.js";
import User from "../models/UserModel.js";

export const getMoods = async (req, res) => {
    try {
        let response;
            response = await Mood.findAll({
                attributes: ['uuid', 'type'],
                include: [{
                    model: User,
                    attributes: ['uuid','type']
                }]
            });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getMoodById = async (req, res) => {
    try {
        const mood = await Mood.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!mood) return res.status(404).json({ msg: "Data tidak ditemukan" })
        let response;
            response = await Mood.findOne({
                attributes: ['uuid', 'type'],
                where: {
                    id: mood.id
                },
                include: [{
                    model: User,
                    attributes: ['uuid','type']
                }]
            });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createMood = async (req, res) => {
    const { type } = req.body;
    try {
        await Mood.create({
            type: type,
        });
        res.status(201).json({ msg: "Mood Created Successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}

export const updateMood = async (req, res) => {
    try {
        const mood = await Mood.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!mood) return res.status(404).json({ msg: "Data tidak ditemukan" })
        const { type } = req.body;
            await Mood.update({ type },{
                where: {
                    id: mood.id
                }
            });
        res.status(200).json({msg: "Mood updated succesfully"});
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteMood = async(req, res) => {
    try {
        const mood = await Mood.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!mood) return res.status(404).json({ msg: "Data tidak ditemukan" })
            await Mood.destroy({
                where: {
                    id: mood.id
                }
            });
        res.status(200).json({msg: "Mood deleted succesfully"});
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}