require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const data = require("./db.json");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  res.json(data.users);
});

app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { username: req.body.username, password: hashedPassword };
    data.users.push(user);
    fs.writeFile("db.json", JSON.stringify(data), "utf8", function (error) {});
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post("/users/login", async (req, res) => {
  const user = data.users.find((user) => user.username === req.body.username);
  if (user === null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Not allowed");
    }
  } catch {
    res.status(500).send();
  }
});

app.post("/login", (req, res) => {
  //Auth

  const username = req.body.username;
  const user = { name: username };

  const accesToken = jwt.sign(user, process.env.ACCES_TOKEN_SECRET);

  res.json({ user: user, accesToken: accesToken });
});

app.get("/events", (req, res) => {
  res.json(data.events);
});

app.post("/events", (req, res) => {
  const event = { event: req.body.event, place: req.body.place };
  data.events.push(event);
  fs.writeFile("db.json", JSON.stringify(data), "utf8", function (error) {});
});

app.listen(3001);
