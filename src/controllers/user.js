import { AuthUser } from "../utils/validators.js";

export class UserController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  getUsersAll = async (req, res) => {
    const { success, message, data } = await this.userModel.getUsersAll();
    if (!success) {
      return res.status(404).json({ success: false, message: message ?? 'Users not found' });
    }
    res.json({ success: true, message: 'Success', data: data });
  };

  getUsersById = async (req, res) => {
    const { id } = req.body;
    const { success, message, data } = await this.userModel.getUsersById(id);
    if (!success) {
      return res.status(404).json({ success: false, message: message ?? 'Users not found' });
    }
    res.json({ success: true, message: 'Success', data: data });
  };

  createUser = async (req, res) => {
    const { name, password, email, rol_id } = req.body;
    const { success, message, data } = await this.userModel.createUser(name, password, email, rol_id);
    if (!success) {
      return res.status(400).json({ success: false, message: message ?? 'Failed to create user' });
    }
    res.json({ success: true, message: 'Success' });
  };

  updateUser = async (req, res) => {
    const { id, name, password, email, rol_id } = req.body;
    const { success, message, data } = await this.userModel.updateUser(id, name, password, email, rol_id);
    if (!success) {
      return res.status(400).json({ success: false, message: message ?? 'Failed to update user' });
    }
    res.json({ success: true, message: 'Success' });
  };

  deleteUser = async (req, res) => {
    const { access_token } = req.cookies;
    const response = AuthUser(access_token);
    if (!response.status) {
      return res.status(400).json({ success: false, message: response.message ?? 'Failed to authenticate user' });
    }
    if (response.data.rol_id !== 1) {
      return res.status(400).json({ success: false, message: 'user not permission' });
    }
    const { id } = req.body;
    const { success, message, data } = await this.userModel.deleteUser(id, response.data.rol_id);
    if (!success) {
      return res.status(400).json({ success: false, message: message ?? 'Failed to delete user' });
    }
    res.json({ success: true, message: 'Success' });
  };

};
