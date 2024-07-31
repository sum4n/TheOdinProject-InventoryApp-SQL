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

// Routes
const router = require("./routes/itemsRouter");

app.use("/", router);

app.get("/", (req, res) => {
  res.render("pages/index", {
    title: "Home",
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is litening on port: ${PORT}`);
});
