'use strict';
module.exports = function(app) {
  var user = require('../controllers/userController');
  app.route('/user')
    .get(user.getAll)
    .post(user.postNew);

  app.route('/user/:userId')
    .get(user.getUserByID)
    .put(user.updateUser)
    .delete(user.deleteUser);
}