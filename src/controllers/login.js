import jwt from 'jsonwebtoken';
import { isValidPassword } from "../utils/security.js";
import { SECRET_JWT_KEY } from '../config.js';

export class LoginController {
  constructor({ loginModel }) {
    this.loginModel = loginModel;
  }

  loginUser = async (req, res) => {
    const { email, password } = req.body;
    const { success, message, data } = await this.loginModel.getUserByEmail(email);
    if (!success) {
      return res.status(404).json({ success: false, message: message ?? 'User not found' });
    }
    if (!isValidPassword(data.password, password)) {
      return res.status(400).json({ success: false, message: message ?? 'Failed to valid user' });
    }
    // Generate JWT token
    const userInfo = { user_id: data.user_id, userName: data.name, email: data.email, rol_id: data.rol_id };
    const token = jwt.sign( {userInfo: userInfo}, SECRET_JWT_KEY, { expiresIn: '1h' });
    console.log('[login.js] Token: ', token);

    // Set cookie with token
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 120 * 1000 // 1 minute
    });
    
    res.json({ success: true, message: 'Success', data: userInfo } );
  };

  logOutUser = (req, res) => {
    // Clear the cookie
    res.clearCookie('access_token');
    res.json({ success: true, message: 'Success', data: {} } );
  }

};
