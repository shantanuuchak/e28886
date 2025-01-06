const ejs = require("ejs");
const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.get("/:name", (req, res) => {
  res.render("index", { name: req.params.name || "Anonymous" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
