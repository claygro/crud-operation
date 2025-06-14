import express from "express";
import mysql2 from "mysql2";
const app = express();
const port = "your port number"; //declearing port number in variable.
let connection; //initilize connection variable to connect node with mysql.
//adding middleware express.json() to avoid destructuring problem and getting undefined problem in req.body.
app.use(express.json());
//1. Inserting(create) data to table column name and location using post method.
app.post("/user/add", (req, res) => {
  const { name, location } = req.query;
  //inserting data from node to mysql using query.
  connection.query(
    `INSERT INTO uPractice(name,location) VALUES("${name}","${location}")`,
    (err, results, fields) => {
      if (results.affectedRows == 1) {
        res.status(200).send("inserting data successfully");
        console.log(results);
      } else {
        console.log("error in inserting data from node to database", err);
      }
    }
  );
});
//2.read data from node to mysql using get method.

app.get("/user/read/:id", (req, res) => {
  const { id } = req.params;
  //if there is id the show the results or column.
  if (id) {
    connection.query(
      `SELECT * FROM uPractice WHERE id="${id}"`,
      (err, results, fields) => {
        res.status(200).send(...results);
      }
    );
  } else {
    console.log("error in reading the uPractice db column");
    res.status(404).send("error in reading the uPractice db column");
  }
});
//3. Updating data using put method.
app.put("/user/update/:id", (req, res) => {
  //we can use query also but I use body.

  const { id } = req.params;
  if (id) {
    const { name, location } = req.body;
    connection.query(
      `UPDATE uPractice SET name="${name}",location="${location}" WHERE id=${id}`,
      (err, results, fields) => {
        console.log(results);
        res.status(200).json({ update: true, message: "update successfully" });
      }
    );
  } else {
    res.status(404).json({ update: false, message: "user id is not valid" });
  }
});
//4. Delete operation in db using delete method.
app.delete("/user/delete/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    connection.query(
      `DELETE FROM uPractice WHERE id=${id}`,
      (err, results, fields) => {
        res.status(200).json({ success: true, message: "Delete successfully" });
        console.log(results);
      }
    );
  } else {
    res.status(404).json({ success: false, message: "User id is not valid." });
  }
});
app.listen(port, () => {
  console.log("server is listening at", port);
  //connecting node with mysql when the server is listening or starting.
  connection = mysql2.createConnection({
    host: "localhost",
    user: "your user name",
    password: "your password",
    database: "your database name",
  });
});
