const express = require("express");
const db = require("./config/db");
const User = require("./model/UserModel");
const path = require("path");

// Express app banaya (server start karne ke liye)
const app = express();

// JSON data ko read karne ke liye enable kiya
app.use(express.json());

// EJS set kiya (HTML pages dynamic banane ke liye)
app.set("view engine", "ejs");

// Views folder ka path set kiya (jahan HTML/EJS files hoti hain)
app.set("views", path.join(__dirname, "views"));

// Public folder ko open kiya (CSS, JS, images yahan se load honge)
app.use(express.static("public"));
  
app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);

    res.render("index", { users });
  } catch (err) {
    console.log(err);
    res.send("Error loading page");
  }
});
app.post("/User", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = new User({
      username,
      password
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/User", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get("/User/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

app.patch("/User/:id", async (req, res) => {
  const { username, password } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { username, password },
    { new: true }
  );
  res.json(updatedUser);
}
);

app.delete("/User/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});


app.listen(8203, () => {
  console.log("Server running on port 8203");
});