import express from "express";
import connection from "../config/connection.js";
let routes = express.Router();
//1. Inserting(create) data to table column name and location using post method.
routes.post("/add", async (req, res) => {
  const { name, location } = req.query;
  //inserting data from node to mysql using query.
  try {
    await connection.query(`INSERT INTO uPractice(name,location) VALUES(?,?)`, [
      name,
      location,
    ]);
    res.status(200).send("inserting data successfully");
  } catch (err) {
    res.status(404).send("error in inserting data");
    console.log("error in inserting in data", err);
  }
});
//2.read data from node to mysql using get method.

routes.get("/read/:id", async (req, res) => {
  const { id } = req.params;
  //if there is id the show the results or column.
  if (id) {
    const [rows] = await connection.query(
      `SELECT * FROM uPractice WHERE id=?`,
      [id]
    );
    res.status(200).send(rows);
    console.log(rows);
  } else {
    console.log("error in reading the uPractice db column");
    res.status(404).send("error in reading the uPractice db column");
  }
});
//3. Updating data using put method.
routes.put("/update/:id", async (req, res) => {
  //we can use query also but I use body.

  const { id } = req.params;
  if (id) {
    try {
      const { name, location } = req.body;
      connection.query(`UPDATE uPractice SET name=?,location=? WHERE id=?`, [
        name,
        location,
        id,
      ]);
      res.status(200).json({ update: true, message: "update successfully" });
    } catch (err) {
      res.status(404).json({ update: false, message: "update failed" });
      console.log("error in update the crud..", err);
    }
  } else {
    res.status(404).json({ update: false, message: "user id is not valid" });
  }
});
//4. Delete operation in db using delete method.
routes.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      await connection.query(`DELETE FROM uPractice WHERE id=?`, [id]);
      res.status(200).json({ success: true, message: "Delete successfully" });
    } catch (err) {
      res.status(404).json({ success: false, message: "failed in delete" });
      console.log("error in delete the data", err);
    }
  } else {
    res.status(404).json({ success: false, message: "User id is not valid." });
  }
});
export default routes;
