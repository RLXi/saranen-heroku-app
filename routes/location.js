const express = require("express");
const { locationsDB } = require("../db");
const locations = express.Router();

locations.use(express.json());

locations.get("/", (req, res) => {
  res.status(200).send(locationsDB);
});

locations.get("/:id", (req, res) => {
  const loc = locationsDB.find((l) => l.id === parseInt(req.params.id));
  res.status(200).json(loc);
});

locations.get("/about", (req, res) => {
  console.log("Get Locations");
  res.status(200).send("Get Locations");
});

module.exports = locations;
