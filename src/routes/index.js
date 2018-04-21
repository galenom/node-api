'use strict';
export default function(app) {
  var user = require('../controllers/userController');
  app.route('/users')
    .get(user.getAll)
    .post(user.postNew);

  app.route('/users/:userId')
    .get(user.getUserByID)
    .put(user.updateUser)
    .delete(user.deleteUser);
}