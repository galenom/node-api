// const express = require('express');
import express from 'express';
import routes from './src/routes'

const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.listen(port);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

console.log('API started on: ' + port);