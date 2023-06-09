import express from "express";
import cors from "cors";
import db from "./config/Database.js";
import Bevs from "./models/BevModel.js";
import Foods from "./models/FoodModel.js";
import FoodPairings from "./models/FoodPairingModel.js";
import Moods from "./models/MoodModel.js";
import User from "./models/UserModel.js";

import bcrypt from "bcrypt";
const saltRounds = 10;

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

//login user
app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Wrong Password" });
    }
    const { id, uuid, name, email: userEmail, role } = user;
    res.status(200).json({ id, uuid, name, email: userEmail, role });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//get all users
app.get('/users', async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ['id', 'uuid', 'name', 'email', 'password', 'role', 'updatedAt']
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//get user by id
app.get('/users/:id', async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ['uuid', 'name', 'email', 'password', 'role'],
      where: {
        uuid: req.params.id
      }
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//create user
app.post('/users', async (req, res) => {
  const { name, email, password, role } = req.body;
  const existingUser = await User.findOne({ where: { email: email } });
  if (existingUser) {
    return res.status(400).json({ msg: "Email sudah digunakan" });
  }
  const existingName = await User.findOne({ where: { name: name } });
  if (existingName) {
    return res.status(400).json({ msg: "Nama sudah digunakan" });
  }
  try {
    const hashPassword = await bcrypt.hash(password, 10); // Specify the number of salt rounds
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });
    res.status(201).json({ msg: "Registrasi Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

//update user
app.put('/users/:id', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id
      }
    });

    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        role: role
      },
      {
        where: {
          id: req.params.id
        }
      }
    );

    res.status(200).json({ msg: "User updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});


//delete user
app.delete('/users/:id', async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ msg: "User deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

//get all foods
app.get('/foods', async (req, res) => {
  try {
    const response = await Foods.findAll({
      attributes: ['uuid', 'name', 'price', 'ings', 'img', 'desc'],
      include: [{
        model: User,
        attributes: ['name', 'email']
      }]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Get food by ID
app.get('/foods/:id', async (req, res) => {
  try {
    const food = await Foods.findOne({
      where: {
        uuid: req.params.id
      },
      attributes: ['uuid', 'name', 'price', 'ings', 'img', 'desc'],
      include: [{
        model: User,
        attributes: ['name', 'email']
      }]
    });

    if (!food) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Create food
app.post('/foods', async (req, res) => {
  const { name, price, ings, img, desc } = req.body;

  try {
    await Foods.create({
      name: name,
      price: price,
      ings: ings,
      img: img,
      desc: desc,
      userId: req.userId
    });

    res.status(201).json({ msg: "Food Created Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Update food
app.put('/foods/:id', async (req, res) => {
  try {
    const food = await Foods.findOne({
      where: {
        uuid: req.params.id
      }
    });

    if (!food) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    const { name, price, ings, img, desc } = req.body;

    await Foods.update(
      { name, price, ings, img, desc },
      {
        where: {
          id: food.id
        }
      }
    );

    res.status(200).json({ msg: "Food updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Delete food
app.delete('/foods/:id', async (req, res) => {
  try {
    const food = await Foods.findOne({
      where: {
        uuid: req.params.id
      }
    });

    if (!food) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    await Foods.destroy({
      where: {
        id: food.id
      }
    });

    res.status(200).json({ msg: "Food deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.listen(5000, () => {
  console.log("running server");
});