const express = require("express");
const db = require("./config/db");
const User = require("./model/UserModel");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is working!");
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