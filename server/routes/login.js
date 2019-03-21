const routes = require('express').Router();
const passport = require('passport');

routes.get('/', (req, res) => {
  res.send('You got to the login page!\n');
});

routes.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (info) {
      return res.send(info.message);
    }
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.login(user, err => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: 'Authentication Sucessful' });
    });
  })(req, res, next);
});

module.exports = routes;
