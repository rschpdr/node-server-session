const routes = require('express').Router();
const usuarioController = require('../controllers').usuario;

routes.get('/', usuarioController.list);
routes.post(
  '/',
  usuarioController.validate('create'),
  usuarioController.create
);

module.exports = routes;
