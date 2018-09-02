// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the pets
  app.get("/api/pets", function(req, res) {
    var query = {};
    if (req.query.owner_id) {
      query.AuthorId = req.query.owner_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Pets.findAll({
      where: query,
      include: [db.Pet]
    }).then(function(dbPet) {
      res.json(dbPet);
    });
  });

  // Get route for retrieving a single pet
  app.get("/api/pets/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Owner
    db.Pet.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Owner]
    }).then(function(dbPet) {
      res.json(dbPet);
    });
  });

  // POST route for saving a new pet
  app.post("/api/pets", function(req, res) {
    db.Post.create(req.body).then(function(dbPet) {
      res.json(dbPet);
    });
  });

  // DELETE route for deleting pets
  app.delete("/api/pets/:id", function(req, res) {
    db.Pet.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPet) {
      res.json(dbPet);
    });
  });

  // PUT route for updating pets
  app.put("/api/pets", function(req, res) {
    db.Pet.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPet) {
      res.json(dbPet);
    });
  });
};
