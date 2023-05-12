const express = require('express');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser')
const fileupload = require('express-fileupload')
const dotenv = require('dotenv');

const app = express();

const errorMiddleware = require('./middlewares/error')
dotenv.config({ path: 'backend/config/config.env' });

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.urlencoded({limit:'50mb',extended:true}));

app.use(cookieParser());
app.use(fileupload());


//Import all routes
const products = require('./routes/product');
const users = require('./routes/auth');
const payment = require('./routes/payment');
const order = require('./routes/order');



app.use('/api/v1', products);
app.use('/api/v1', users);
app.use('/api/v1', order);
app.use('/api/v1', payment);

app.use(errorMiddleware);

module.exports = app;