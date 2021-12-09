const express = require("express");
const cors = require("cors");
const { locationsDB } = require("../db");
const locations = express.Router();

let locBase = [...locationsDB];

locations.use(express.json());
locations.use(cors());

locations.get("/", (req, res) => {
  res.status(200).send(locBase);
});

locations.get("/:id", (req, res) => {
  const loc = locBase.find((l) => l.id === parseInt(req.params.id));
  if (!loc) {
    res.status(400).json({ msg: "No such ID" });
    return;
  }
  res.status(200).json(loc);
});

locations.post("/", (req, res) => {
  const id = locBase.reduce(
    (acc, val) => (val.id >= acc ? val.id + 1 : acc),
    0
  );

  const loc = req.body;
  if (!loc.hasOwnProperty("longitude") || !loc.hasOwnProperty("latitude")) {
    res.status(400).send({ msg: "Failed to post, invalid properties" });
    return;
  }
  if (isNaN(loc.longitude) || isNaN(loc.latitude)) {
    res.status(400).send({ msg: "Failed to post, invalid property values" });
    return;
  }
  loc.id = id;
  locBase.push(loc);

  res.status(201).send(loc);
});

locations.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.status(202).send({ msg: "Entry updated" });
});

locations.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const newBase = locBase.filter((loc) => loc.id !== id);
  if (newBase.length === locBase.length) {
    res.status(404).send({ msg: "Failed to delete" });
    return;
  }
  locBase = newBase;

  res.status(200).send({ msg: "Entry deleted" });
});

locations.get("/about", (req, res) => {
  console.log("Get Locations");
  res.status(200).send("Get Locations");
});

module.exports = locations;
