const express = require('express');
const { celebrate } = require('celebrate');
const ongs = require('../controllers/ongs');
const incidents = require('../controllers/incidents');
const profile = require('../controllers/profile');
const session = require('../controllers/session');
const ongValidator = require('../security/ongsValidator');
const sessionsValidator = require('../security/sessionsValidator');
const profileValidator = require('../security/profileValidator');
const { getAllIncidents, deleteIncidentValidator, deleteAllIncidentsValidator } = require('../security/incidentsValidator');

const routes = express.Router();

routes.post('/sessions', celebrate(sessionsValidator), session.create);

routes.post('/ongs', celebrate(ongValidator), ongs.create);

routes.get('/ongs', ongs.list);

routes.get('/ongs/:id', ongs.get);

routes.post('/incidents', incidents.create);

routes.get('/incidents', celebrate(getAllIncidents), incidents.list);

routes.get('/incidents/:id', incidents.get);

routes.delete('/incidents/:id', celebrate(deleteIncidentValidator), incidents.delete);

routes.delete('/incidents', celebrate(deleteAllIncidentsValidator), incidents.deleteAll);

routes.get('/profile', celebrate(profileValidator), profile.list);

module.exports = routes;
