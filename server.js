const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

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

app.get("/events", (req, res) => {
  res.json(events);
});

app.post("./login", (req, res) => {
  //auth

  const username = req.body.username;
  const user = { name: username };

  const accesToken = jwt.sign(user, process.env.ACCES_TOKEN_SECRET);
  res.json({ accesToken, accesToken });
});

app.listen(3001);
