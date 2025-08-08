import { Router } from "express";
import { UserController } from "../controllers/user.js";
import { validateId, validateCreateUser, validateUpdateUser, validateDeleteUser, tokenAuth } from "../middlewares/validators.js";

export const createUserRoutes = ({ userModel }) => {
  const usersRouter = Router();

  const userController = new UserController({ userModel });
  usersRouter.get('/', userController.getUsersAll);
  usersRouter.get('/GetUsersById', validateId, userController.getUsersById);
  usersRouter.post('/CreateUser', validateCreateUser, userController.createUser);
  usersRouter.patch('/UpdateUser', tokenAuth, validateUpdateUser, userController.updateUser);
  usersRouter.delete('/DeleteUser', tokenAuth, validateDeleteUser, userController.deleteUser);
  return usersRouter;
  
};
