const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const communityRouter = require('./routes/community');
const analyticsRouter = require('./routes/analytics');

const app = express();
global.appRoot = path.resolve(__dirname);


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/community', communityRouter);
app.use('/analytics', analyticsRouter);

module.exports = app;
