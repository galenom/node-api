import { authUser, getAll, postNew, getUserByID, updateUser, deleteUser} from '../controllers/userController';

export default function (app) {
  

  app.route('/auth')
    .post(authUser);

  app.route('/users')
    .get(getAll)
    .post(postNew);

  app.route('/users/:userId')
    .get(getUserByID)
    .put(updateUser)
    .delete(deleteUser);
}