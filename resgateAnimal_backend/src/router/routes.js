const express = require('express');
const ongs = require('../controllers/ongs');
const incidents = require('../controllers/incidents');
const profile = require('../controllers/profile');
const session = require('../controllers/session');

const routes = express.Router();

routes.post('/sessions', session.create);

routes.post('/ongs', ongs.create);

routes.get('/ongs', ongs.list);

routes.get('/ongs/:id', ongs.get);

routes.post('/incidents', incidents.create);

routes.get('/incidents', incidents.list);

routes.get('/incidents/:id', incidents.get);

routes.delete('/incidents/:id', incidents.delete);

routes.delete('/incidents', incidents.deleteAll);

routes.get('/profile', profile.list);

module.exports = routes;
