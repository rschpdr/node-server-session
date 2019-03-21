const express = require('express');
const uuid = require('uuid/v4');
const session = require('express-session');
const cors = require('cors');
const FileStore = require('session-file-store')(session);
const passport = require('./config/passport');
const routes = require('./routes');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    genid: req => {
      return uuid();
    },
    store: new FileStore(),
    secret: 'keyboard  cat',
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
