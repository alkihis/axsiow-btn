import express from 'express';
import session from 'express-session';

const app = express();

app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' },
  name: 'axsiow.session',
}));

module.exports = app;
