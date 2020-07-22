// Dependencies
// =============================================================
const express = require("express");
// need path for filename paths
const path = require("path");



// creating an "express" server
const app = express();
// Sets an Initial port for listeners
const PORT = process.env.PORT || 3000;


// Sets up the Express App
// =============================================================


// Sets up the Express app to handle data and www parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, ".")));

// Routes
// =============================================================

require("./routes/api-routes")(app);
require("./routes/html-routes")(app);



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
