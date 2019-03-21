const routes = require('express').Router();
const login = require('./login');
const authrequired = require('./authrequired');
const usuario = require('./usuario');

routes.get('/', (req, res) => {
  res.send(`You got home page!\n`);
});

routes.use('/login', login);
routes.use('/authrequired', authrequired);
routes.use('/usuario', usuario);

module.exports = routes;
