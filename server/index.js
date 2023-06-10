import express from "express";
import cors from "cors";
import multer from "multer";
import db from "./config/Database.js";
import Bevs from "./models/BevModel.js";
import Foods from "./models/FoodModel.js";
import FoodPairings from "./models/FoodPairingModel.js";
import Moods from "./models/MoodModel.js";
import User from "./models/UserModel.js";
import fs from "fs";
import path from "path";

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
      attributes: ['id', 'uuid', 'name', 'price', 'ings', 'img1', 'img2', 'img3', 'desc'],
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
      attributes: [,'uuid', 'name', 'price', 'ings', 'img', 'desc'],
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
app.post('/foods', upload.fields([
  { name: 'img1', maxCount: 1 },
  { name: 'img2', maxCount: 1 },
  { name: 'img3', maxCount: 1 }
]), async (req, res) => {
  const { name, price, ings, desc, userId } = req.body;
  const images = req.files;

  try {
    if (!images.img1 || !images.img2 || !images.img3) {
      throw new Error('Please upload 3 images');
    }

    const img1 = images.img1[0].filename;
    const img2 = images.img2[0].filename;
    const img3 = images.img3[0].filename;
    await Foods.create({
      name: name,
      price: price,
      ings: ings,
      img1: img1,
      img2: img2,
      img3: img3,
      desc: desc,
      userId: userId,
    });

    res.status(201).json({ msg: "Food Created Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error.message);
  }
});

// Update food
app.put('/foods/:id', upload.fields([
  { name: 'img1', maxCount: 1 },
  { name: 'img2', maxCount: 1 },
  { name: 'img3', maxCount: 1 }
]), async (req, res) => {
  try {
    const food = await Foods.findOne({
      where: {
        id: req.params.id
      }
    });

    if (!food) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    const { name, price, ings, desc, userId } = req.body;
    const images = req.files;

    if (images.img1) {
      // Menghapus gambar lama
      if (food.img1) {
        const oldImagePath = path.join('../client/public/img/', food.img1);
        fs.unlinkSync(oldImagePath);
      }
      food.img1 = images.img1[0].filename;
    }
    if (images.img2) {
      // Menghapus gambar lama
      if (food.img2) {
        const oldImagePath = path.join('../client/public/img/', food.img2);
        fs.unlinkSync(oldImagePath);
      }
      food.img2 = images.img2[0].filename;
    }
    if (images.img3) {
      // Menghapus gambar lama
      if (food.img3) {
        const oldImagePath = path.join('../client/public/img/', food.img3);
        fs.unlinkSync(oldImagePath);
      }
      food.img3 = images.img3[0].filename;
    }

    // Lakukan pembaruan data makanan
    await Foods.update(
      { name, price, ings, img1: food.img1, img2: food.img2, img3: food.img3, desc, userId },
      {
        where: {
          id: req.params.id
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
        id: req.params.id
      }
    });

    if (!food) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    // Menghapus gambar jika ada
    if (food.img1) {
      const imagePath = path.join('../client/public/img/', food.img1);
      fs.unlinkSync(imagePath);
    }
    if (food.img2) {
      const imagePath = path.join('../client/public/img/', food.img2);
      fs.unlinkSync(imagePath);
    }
    if (food.img3) {
      const imagePath = path.join('../client/public/img/', food.img3);
      fs.unlinkSync(imagePath);
    }

    // Menghapus data makanan
    await Foods.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json({ msg: "Food deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});



// BEVERAGE
//Get all beverage
app.get('/bevs', async (req, res) => {
  try {
    const response = await Bevs.findAll({
      attributes: ['uuid', 'name', 'price', 'ings', 'img1', 'img2', 'img3', 'highlight', 'brew', 'desc', 'type'],
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
      attributes: ['uuid', 'name', 'price', 'ings', 'img1', 'img2', 'img3', 'highlight', 'brew', 'desc', 'type'],
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
const BevStorage = multer.diskStorage({
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
const uploadBev = multer({ storage: BevStorage });

// Create Bev
app.post('/bevs', uploadBev.array('img', 3), async (req, res) => {
  const { name, price, ings, highlight, brew, desc, type, userId } = req.body;
  const images = req.files;

  try {
    if (images.length !== 3) {
      throw new Error('Please upload 3 images');
    }

    const img1 = images[0].filename;
    const img2 = images[1].filename;
    const img3 = images[2].filename;
    await Bevs.create({
      name: name,
      price: price,
      ings: ings,
      img1: img1,
      img2: img2,
      img3: img3,
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
app.put('/bevs/:id', upload.array('img', 3), async (req, res) => {
  try {
    const bev = await Bevs.findOne({
      where: {
        id: req.params.id
      }
    });

    if (!bev) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    const { name, price, ings, highlight, brew, desc, type, userId } = req.body;
    const images = req.files;

    if (images.length !== 3) {
      throw new Error('Please upload 3 images');
    }

    const img1 = images[0].filename;
    const img2 = images[1].filename;
    const img3 = images[2].filename;

    await Bevs.update(
      { name, price, ings, img1, img2, img3, highlight, brew, desc, type, userId },
      {
        where: {
          id: req.params.id
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
        id: req.params.id
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