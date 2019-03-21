const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const axios = require('axios');

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    axios
      .get(`http://localhost:5000/users?email=${email}`)
      .then(res => {
        const user = res.data[0];
        if (!user) {
          return done(null, false, { message: 'Invalid credentials.\n' });
        }

        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, {
            message: 'Invalid credentials.\n'
          });
        }
        return done(null, user);
      })
      .catch(err => done(err));
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  axios
    .get(`http://localhost:5000/users/${id}`)
    .then(res => done(null, res.data))
    .catch(err => done(err, false));
});

module.exports = passport;
