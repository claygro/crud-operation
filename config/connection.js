import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
export default await mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
