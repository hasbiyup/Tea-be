import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import argon2 from 'argon2';

const { DataTypes } = Sequelize;

const Users = db.define('user', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

// db.sync()
//   .then(async () => {
//     const password = "123456";
//     const hashedPassword = await argon2.hash(password); // Menghash password menggunakan argon2
//     await Users.bulkCreate([
//       { name: "Hasbi" , email: "hasbi@gmail.com", password: hashedPassword, role: "admin"}
//     ]);
//     console.log("Database synced and Moods data added");
//   })
//   .catch((error) => {
//     console.error("Error syncing database:", error);
//   });

export default Users;