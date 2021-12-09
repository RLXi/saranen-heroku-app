const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("public"));

const staticDB = [
  {
    id: 1,
    name: "admin",
    interests: "everything",
  },
  {
    id: 2,
    name: "dev",
    interests: "only dev things",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/people", (req, res) => {
  res.status(200).json(staticDB);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
