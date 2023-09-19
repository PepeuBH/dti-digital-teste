const express = require("express");
const routes = express.Router();
const connection = require("./database/connection");
const LembreteController = require("./controllers/lembreteController");
const ProfileController = require("./controllers/ProfileController");

//create reminder
routes.post("/lembretes", LembreteController.create);

//list all reminders
routes.get("/lembretes", LembreteController.index);

//delete reminder
routes.delete('/lembretes/:id', LembreteController.delete);

routes.get('/lembrete/:id', ProfileController.index);

module.exports = routes;
