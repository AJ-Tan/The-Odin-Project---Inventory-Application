const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const dashboardRoute = require("./Pages/Dashboard/dashboardRoute");
const productsRoute = require("./Pages/Products/productsRoute");
const inventoryRoute = require("./Pages/Inventory/inventoryRoute");
const settingsRoute = require("./Pages/Settings/settingsRoute");
const errorRoute = require("./Pages/Error/errorRoute");

const initializeSession = session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
});

const app = express();
app.set("views", path.join(__dirname, "Pages"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "Pages")));
app.use(initializeSession);
app.use(flash());
app.use("/", dashboardRoute);
app.use("/products", productsRoute);
app.use("/inventory", inventoryRoute);
app.use("/settings", settingsRoute);
app.use(errorRoute);

const PORT = process.env.PORT || 4321;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`http://localhost:${PORT}`);
});
