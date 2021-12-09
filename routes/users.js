const express = require("express");
const { staticDB } = require("../db");
const people = express.Router();

people.use(express.json());

people.get("/", (req, res) => {
  res.send(staticDB);
});

people.get("/:id", (req, res) => {
  console.log("router");
  console.log(req.params);
  const person = staticDB.find((u) => u.id === parseInt(req.params.id));
  res.status(200).json(person);
});

people.get("/about", (req, res) => {
  console.log("router");
  res.status(200).send("About");
});

module.exports = people;
