// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our modelsvar db = require("../models");
var db = require("../models");

module.exports = function(app) {
  app.get("/api/owners", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Owner.findAll({
      include: [db.Pet]
    }).then(function(dbOwner) {
      res.json(dbOwner);
    });
  });

  app.get("/api/owner/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Pet
    db.Owner.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Pet]
    }).then(function(dbOwner) {
      res.json(dbOwner);
    });
  });

  app.post("/api/owners", function(req, res) {
    db.Owner.create(req.body).then(function(dbOwner) {
      res.json(dbOwner);
    });
  });

  app.delete("/api/owners/:id", function(req, res) {
    db.Owner.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbOwner) {
      res.json(dbOwner);
    });
  });
  // GET route for getting all of the pets
  app.get("/api/pets", function(req, res) {
    var query = {};
    if (req.query.owner_id) {
      query.OwnerId = req.query.owner_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Pet
    console.log(db);
    db.Pet.findAll({}).then(function(dbPet) {
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
    console.log(req.body);
    db.Pet.create(req.body).then(function(dbPet) {
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
    db.Pet.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbPet) {
      res.json(dbPet);
    });
  });
  // GET route for getting all of the logs/entries
  app.get("/api/entries", function(req, res) {
    var query = {};
    if (req.query.pet_id) {
      query.LogId = req.query.pet_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Pet
    db.Entry.findAll({
      where: query,
      include: [db.Pet]
    }).then(function(dbPet) {
      res.json(dbPet);
    });
  });

  // POST route for saving a new log
  app.post("/api/entries", function(req, res) {
    db.Entry.create(req.body).then(function(dbEntry) {
      res.json(dbEntry);
    });
  });

  // DELETE route for deleting logs
  app.delete("/api/entries/:id", function(req, res) {
    db.Entry.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbEntry) {
      res.json(dbEntry);
    });
  });
};
