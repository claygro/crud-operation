import mysql2 from "mysql2/promise";

export default await mysql2.createConnection({
  host: "localhost",
  user: "your user name",
  password: "your password",
  database: "your database name",
});
