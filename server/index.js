import express from "express";
import cors from "cors";
import multer from "multer";
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

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/img/'); // Set the destination folder where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension); // Set the file name
  }
});

// Create the Multer upload instance
const upload = multer({ storage: storage });

// Create food
app.post('/foods', upload.single('img'), async (req, res) => {
  const { name, price, ings, desc, userId } = req.body;
  const img = req.file.filename; // Get the uploaded image file name

  try {
    await Foods.create({
      name: name,
      price: price,
      ings: ings,
      img: img,
      desc: desc,
      userId: userId,
    });

    res.status(201).json({ msg: "Food Created Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error.message);
    console.log(error.response)
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

// BEVERAGE
//Get all beverage
app.get('/bevs', async (req, res) => {
  try {
    const response = await Bevs.findAll({
      attributes: ['uuid', 'name', 'price', 'ings', 'img', 'highlight', 'brew', 'desc', 'type'],
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

// Get bevs by ID
app.get('/bevs/:id', async (req, res) => {
  try {
    const bev = await Bevs.findOne({
      where: {
        uuid: req.params.id
      },
      attributes: ['uuid', 'name', 'price', 'ings', 'img', 'highlight', 'brew', 'desc', 'type'],
      include: [{
        model: User,
        attributes: ['name', 'email']
      }]
    });

    if (!bev) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    res.status(200).json(bev);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Multer storage configuration
const bevStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/bev-img/'); // Set the destination folder where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension); // Set the file name
  }
});

// Create the Multer upload instance
const uploadBev = multer({ storage: bevStorage });

// Create bev
app.post('/bevs', uploadBev.single('img'), async (req, res) => {
  const { name, price, ings, highlight, brew, desc, type, userId } = req.body;
  const img = req.file.filename; // Get the uploaded image file name

  try {
    await Bevs.create({
      name: name,
      price: price,
      ings: ings,
      img: img,
      highlight: highlight,
      brew: brew,
      desc: desc,
      type: type,
      userId: userId,
    });

    res.status(201).json({ msg: "Beverage Created Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error.message);
    console.log(error.response)
  }
});

// Update bev
app.put('/bevs/:id', async (req, res) => {
  try {
    const bev = await Bevs.findOne({
      where: {
        uuid: req.params.id
      }
    });

    if (!bev) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    const { name, price, ings, img, highlight, brew, desc, type } = req.body;

    await Bevs.update(
      { name, price, ings, img, highlight, brew, desc, type },
      {
        where: {
          id: bev.id
        }
      }
    );

    res.status(200).json({ msg: "Beverage updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Delete bev
app.delete('/bevs/:id', async (req, res) => {
  try {
    const bev = await Bevs.findOne({
      where: {
        uuid: req.params.id
      }
    });

    if (!bev) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    await Bevs.destroy({
      where: {
        id: bev.id
      }
    });

    res.status(200).json({ msg: "Beverage deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.listen(5000, () => {
  console.log("running server");
});