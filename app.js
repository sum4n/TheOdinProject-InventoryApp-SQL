const express = require("express");

const app = express();

// Set view engine.
app.set("view engine", "ejs");

// Middleware to parse form data into req.boy
app.use(express.urlencoded({ extended: true }));

// Serve static assests.
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("hello world!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App is litening on port: ${PORT}`));
