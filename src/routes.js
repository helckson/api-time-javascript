const express = require('express');
const TimeController = require('./controllers/TimeController');
const TituloController = require('./controllers/TituloController');
const UserController = require('./controllers/UserController');
const authMiddleware = require('./middleware/authMiddleware');

const routes = express.Router();

routes.post('/time', TimeController.create);
routes.get('/time', authMiddleware, TimeController.index);
routes.get('/time/:id', authMiddleware, TimeController.findById);
routes.delete('/time/:idTime', TimeController.delete);
routes.put('/time/:idTime', TimeController.update);


routes.post('/time/:time_id/titulo', TituloController.create);
routes.get('/titulo/:idTitulo', TituloController.findForOne);
routes.delete('/titulo/:idTitulo', TituloController.delete);
routes.put('/titulo/:idTitulo', TituloController.update);

routes.post('/user', UserController.create);
routes.post('/user/login', UserController.login);


module.exports = routes;