const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());
app.use(helmet());

mongoose.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${encodeURIComponent(process.env.DATABASE_PASSWORD)}@${process.env.DATABASE_URI}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,{
  keepAlive: 1,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('Database Connected'));

const routers = require('./routes');
routers(app);

//handling error
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;

  //pass const error to next middleware
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    status: false,
    response: null,
    message: error.message
  });
});

module.exports = app;
