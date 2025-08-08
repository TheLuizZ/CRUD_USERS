import { Router } from "express";
import { LoginController } from "../controllers/login.js";
import { validateLoginUser } from "../middlewares/validators.js";

export const createLoginRoutes = ({ loginModel }) => {
  const loginRouter = Router();

  const loginController = new LoginController({ loginModel });
  loginRouter.post('/Login', validateLoginUser, loginController.loginUser);
  loginRouter.post('/LogOut', loginController.logOutUser);
  return loginRouter;
  
};
