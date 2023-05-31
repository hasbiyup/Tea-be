import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Moods from "./MoodModel.js";

const {DataTypes} = Sequelize;

const Bevs = db.define('bev',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    ings:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    img:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    highlight:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    brew:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    desc:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName: true
});

Users.hasMany(Bevs);
Bevs.belongsTo(Users, {foreignKey: 'userId'});

Moods.belongsToMany(Bevs, { through: 'MoodBev'});
Bevs.belongsToMany(Moods, { through: 'MoodBev'});

// db.sync()
//   .then(async () => {
//     await Moods.bulkCreate([
//       { type: "Angry" },
//       { type: "Disgust" },
//       { type: "Fear" },
//       { type: "Happy" },
//       { type: "Neutral" },
//       { type: "Sad" },
//       { type: "Surprise" }
//     ]);
//     console.log("Database synced and Moods data added");
//   })
//   .catch((error) => {
//     console.error("Error syncing database:", error);
//   });

export default Bevs;