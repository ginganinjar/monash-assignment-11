
// need path for filename paths
const path = require("path");


module.exports = function(app) {

// Web page when the Get started button is clicked
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../notes.html"));
  });
  
  // If no matching route is found default to home
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../index.html"));
  });
  
  app.get("/api/notes", function(req, res) {
    return res.sendFile(path.json(__dirname, "../db/db.json"));
  });
}
