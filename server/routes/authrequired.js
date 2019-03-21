const routes = require('express').Router();

routes.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res
      .status(200)
      .json({ message: "You've hit the authentication endpoing" });
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
});

module.exports = routes;
