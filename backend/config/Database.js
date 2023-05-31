import {Sequelize} from "sequelize";

const db = new Sequelize('teanology2_db', 'root', '', {
  host: "localhost",
  dialect: "mysql"
});

export default db;