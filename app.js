const express = require("express");
const session = require("express-session");
const path = require("path");
const indexRoute = require("./Components/Index/indexRoute");

const initializeSession = session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
});

const app = express();
app.set("views", path.join(__dirname, "Components"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "Components")));
app.use(initializeSession);
app.use("/", indexRoute);

const PORT = process.env.PORT || 4321;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`http://localhost:${PORT}`);
});
