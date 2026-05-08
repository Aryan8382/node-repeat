const express = require("express");
const db = require("./config/db");
const router = require("./Routes/userRoute");


const app = express();

app.use(express.json());

app.set("view engine", "ejs");

app.use("/user", router);


app.listen(8203, () => {
  console.log("Server running on port 8203");
});