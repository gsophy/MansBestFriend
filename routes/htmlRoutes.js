// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.Allison.html"));
  });

  // route loads an html
  app.get("/addPet", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/addPet.html"));
  });

  // route loads an html
  app.get("/addLog", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/addLog.html"));
  });

  app.get("/logs", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/logs.html"));
  });
};
