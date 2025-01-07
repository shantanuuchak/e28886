const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const db = require("better-sqlite3")("e28886.db");
db.pragma("journal_mode = WAL");

const createTables = db.transaction(() => {
  db.prepare(
    `
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		username STRING NOT NULL UNIQUE,
		password STRING NOT NULL
	)
	`
  ).run();
});

createTables();

const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.locals.errors = [];
  next();
});

app.get("/", (req, res) => {
  res.render("index", { name: req.params.name || "Anonymous" });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/register", (req, res) => {
  console.log(req.body);

  const errors = [];

  if (typeof req.body.username !== "string") req.body.username = "";
  if (typeof req.body.password !== "string") req.body.password = "";

  // Username Validation
  req.body.username = req.body.username.toLowerCase().trim();

  if (!req.body.username) {
    errors.push("You must provide a username.");
  }

  if (req.body.username && req.body.username.length < 4)
    errors.push("Username must be atleast 4 characters long.");

  if (req.body.username.length > 15)
    errors.push("Username must not be longer than 15 characters.");

  if (req.body.username && !req.body.username.match(/^[a-zA-Z0-9]+$/))
    errors.push("Username can only contain letters and numbers.");

  // Password Validation
  if (!req.body.password) {
    errors.push("You must provide a password.");
  }

  if (req.body.password && req.body.password.length < 8)
    errors.push("Password must be atleast 8 characters long.");

  if (req.body.password.length > 20)
    errors.push("Password must not be longer than 20 characters.");

  if (errors.length) {
    return res.render("index", {
      errors: errors,
    });
  }

  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(req.body.password, salt);

  // Save the user to the database
  const ourStatement = db.prepare(
    `INSERT INTO users (username, password) VALUES (?, ?)`
  );

  ourStatement.run(req.body.username, req.body.password);

  // Log the user in by giving them a cookie
  res.send(`Thanks for registering! ${req.body.username}`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
