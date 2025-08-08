import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import { createUserRoutes } from './routers/user.js';
import { createLoginRoutes } from './routers/login.js';
import { validateJSON } from './middlewares/validators.js';
import { UserModel } from './models/users.js';
import { LoginModel } from './models/login.js';

const userModel = UserModel;
const loginModel = LoginModel;

const app = express();
app.disable('x-powered-by');
app.use(json());
app.use(validateJSON);
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Welcome to the CRUD Users API');
});

app.use('/users', createUserRoutes({ userModel }));
app.use('/login', createLoginRoutes({ loginModel }));

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
