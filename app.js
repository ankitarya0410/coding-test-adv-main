const express = require('express');
const expressWinston = require('express-winston');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const tokenValidator = require('./routes/middleware/auth');
const authRouter = require('./routes/auth');

const createApp = (logger) => {
  const app = express();

  async function validateToken (req, res, next) {
    await tokenValidator(req.header.authorization.split(' ')[1]);
    next()
  }

  app.use(cors());
  app.use(expressWinston.logger({ winstonInstance: logger }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // TODO: Serve your React App using the express server
  const buildPath = path.normalize(path.join(__dirname, './client/build'));
  app.use(express.static(buildPath));

  app.use('/auth', authRouter);

  app.use(validateToken);


  // catch 404 and forward to error handler
  app.use((req, res) => {
    res.status(404).send('Not found');
  });

  // error handler
  app.use((err, req, res) => {
    res.status(err.status || 500);
  });

  return app;
};

module.exports = createApp;
