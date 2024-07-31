const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const app = express();

// Load environment variable
dotenv.config();

// Set view engine.
app.set("view engine", "ejs");

// Middleware to parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assests.
app.use(express.static(path.join(__dirname, "public")));

// Import route files.
const indexRoutes = require("./routes/index");
const itemsRouter = require("./routes/items");
const slotRouter = require("./routes/slots");
const itemTypesRouter = require("./routes/item_types");

// Use route files.
app.use("/", indexRoutes);
app.use("/items", itemsRouter);
app.use("/slots", slotRouter);
app.use("/item_types", itemTypesRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is litening on port: ${PORT}`);
});
