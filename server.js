require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

const events = [
  {
    event: "Juhlat",
    place: "Koulu",
    id: 1,
  },
  {
    event: "Juhlat2",
    place: "Koulu2",
    id: 2,
  },
  {
    event: "sad",
    place: "asdsa3",
    id: 3,
  },
  {
    event: "Uusi tapahtuma",
    place: "Uusi paikka",
    id: 4,
  },
];

const users = [
  {
    username: "joni@j",
    password: "$2a$10$vTpZSQQGAXaw9sohAzoEDu3HtYiHDxqcHzleAtT0gHAc5qNZYj9/y",
    id: 1,
  },
  {
    username: "joni@joni",
    password: "$2a$10$lNS/XggRh4nJcFgXXnsnM.vdiT92Ftjnb.JM4Sp4hOc6yYC5/mPoC",
    id: 2,
  },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/login", (req, res) => {
  //auth

  const username = req.body.username;
  const user = { name: username };

  const accesToken = jwt.sign(user, process.env.ACCES_TOKEN_SECRET);
  res.json({ accesToken: accesToken });
});

app.listen(3001);
