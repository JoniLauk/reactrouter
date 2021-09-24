const express = require("express");
const app = express();

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

app.get("./login", (req, res) => {
  //auth
});

app.listen(3001);
