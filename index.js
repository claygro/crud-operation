import express from "express";
import routes from "./routes/crud.routes.js";
const app = express();
const port = 8000; //declearing port number in variable.

//adding middleware express.json() to avoid destructuring problem and getting undefined problem in req.body.
app.use(express.json());
//taking routes.
app.use("/user", routes);
app.listen(port, () => {
  console.log("server is listening at", port);
  //connecting node with mysql when the server is listening or starting.
});
