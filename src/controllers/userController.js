import _ from 'lodash';
import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import jwt from 'jsonwebtoken';

import models from '../../db/models';

const Op = Sequelize.Op;

const User = models.User;

export const getAll = function(req, res) {
  User.findAll({}).then((users) => {
    res.json(users);
  }).catch((e) => {
    res.send(e);
  });
};

export const postNew = async function(req, res) {
  let errorMsg;
  if (_.isUndefined(req.body.firstName) || !_.isString(req.body.firstName)) {
    errorMsg = 'Please provide a first name for the user';
  } else if (_.isUndefined(req.body.lastName) || !_.isString(req.body.lastName)) {
    errorMsg = 'Please provide a last name for the user';
  } else if (_.isUndefined(req.body.email) || !_.isString(req.body.email)) {
    errorMsg = 'Please provide an email for the user';
  } else if (_.isUndefined(req.body.username) || !_.isString(req.body.username)) {
    errorMsg = 'Please provide a username for the user';
  } else if (_.isUndefined(req.body.password) || !_.isString(req.body.password)) {
    errorMsg = 'Please provide a password for the user';
  }

  const hash = await bcrypt.hash(req.body.password, 10);
  if (!hash) errorMsg = 'Error creating user account';

  if (!_.isEmpty(errorMsg)) {
    res.status(400).send({ error: errorMsg });
    return;
  }

  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: hash,
  }).then((user) => {
    res.json(user);
  }).catch((e) => {
    res.status(500).send(e);
  });
};

export const getUserByID = function(req, res) {
  User.findById(req.params.userId).then((user) => {
    res.json(user);
  }).catch((e) => {
    res.status(500).send(e);
  });
};

export const updateUser = function(req, res) {
  res.status(500).send('error');
};

export const deleteUser = function(req, res) {
  res.status(500).send('error');
};

export const authUser = async function(req, res) {
  const { username, email, password } = _.get(req, 'body');
  let errorMsg;

  if (!(!!username || !!email) || !password) {
    errorMsg = 'Please provide a username and password';
  }

  const user = await User.findOne({
    where: {
      [Op.or]: [{ username }, { email }]
    }
  });

  if (!user && _.isEmpty(errorMsg)) errorMsg = 'Invalid username/password';

  if (!_.isEmpty(errorMsg)) {
    res.status(403).send({ error: errorMsg });
    return;
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (isValid) {
    // TODO: Use environmental variable for secret key
    const token = await jwt.sign({ username, email }, 'mysecret', { expiresIn: 60 });
    res.status(200).send({ token });
  } else {
    res.status(401).send();
  }
};