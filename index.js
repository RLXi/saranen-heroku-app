const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const people = require("./routes/users");
const locations = require("./routes/location");

app.use(express.static("public"));
app.use((req, res, next) => {
  console.log("I'm middleware");
  next();
});

app.use("/people", people);
app.use("/locations", locations);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
