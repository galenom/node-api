'use strict';
const _ = require('lodash');
const models = require('../../db/models');
const User = models.User;

exports.getAll = function(req, res) {
  User.findAll({}).then((users) => {
    res.json(users);
  }).catch((e) => {
    res.send(e);
  });
}

exports.postNew = function(req, res) {
  let message;
  if (_.isUndefined(req.body.firstName) || !_.isString(req.body.firstName)) {
    console.log(req.body);
    message = 'Please provide a first name for the user';
  } else if (_.isUndefined(req.body.lastName) || !_.isString(req.body.lastName)) {
    message = 'Please provide a last name for the user';
  } else if (_.isUndefined(req.body.email) || !_.isString(req.body.email)) {
    message = 'Please provide an email for the user';
  } else if (_.isUndefined(req.body.username) || !_.isString(req.body.username)) {
    message = 'Please provide a username for the user';
  } else if (_.isUndefined(req.body.password) || !_.isString(req.body.password)) {
    message = 'Please provide a password for the user';
  }

  if (!_.isEmpty(message)) {
    res.status(400).send(message);
    return;
  }

  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  }).then((user) => {
    res.json(user);
  }).catch((e) => {
    res.send(e);
  });
}

exports.getUserByID = function(req, res) {
  User.findById(req.params.userId).then((user) => {
    res.json(user);
  }).catch((e) => {
    res.send(e);
  });
}

exports.updateUser = function(req, res) {
  res.send('error');
}

exports.deleteUser = function(req, res) {
  res.send('error');
}