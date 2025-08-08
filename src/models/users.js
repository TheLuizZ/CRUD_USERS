import { getConnection, mssql } from "../config/connectionSQLServer.js";
import { DEFAULT_CONFIG } from "../utils/const.js";
import { hashed } from "../utils/security.js";

const connectionString = process.env.DB_URL ?? DEFAULT_CONFIG;
const connection = await getConnection(connectionString);

export class UserModel {

  static async getUsersAll() {
    try {
      const result = await connection.query(
        'SELECT * FROM UsersRoles'
      );
      return { success: true, message: 'Users found successfully', data: result.recordset };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  static async getUsersById(id) {
    try {
      const request = connection.request();
      request.input('user_id', mssql.Int, id);
      const result = await request.execute( 'GetUsersById' );
      return { success: true, message: 'User found successfully', data: result.recordset };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  static async createUser(name, password, email, rol_id) {
    try {
      const hashedPassword = hashed(password);
      const request = connection.request();
      request.input('name', mssql.NVarChar, name.toLowerCase());
      request.input('password', mssql.NVarChar, hashedPassword);
      request.input('email', mssql.NVarChar, email.toLowerCase());
      request.input('rol_id', mssql.Int, rol_id);
      const result = await request.execute('InsertUser');
      return { success: true, message: 'User created successfully', data: result.recordset };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  static async updateUser(id, name, password, email, rol_id) {
    try {
      const hashedPassword = hashed(password);
      const request = connection.request();
      request.input('user_id', mssql.Int, id);
      request.input('name', mssql.NVarChar, name.toLowerCase());
      request.input('password', mssql.NVarChar, hashedPassword);
      request.input('email', mssql.NVarChar, email.toLowerCase());
      request.input('rol_id', mssql.Int, rol_id);
      const result = await request.execute('UpdateUser');      
      return { success: true, message: 'User updated successfully', data: result.recordset };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  static async deleteUser(id, rol_id) {
    try {
      const request = connection.request();
      request.input('user_id', mssql.Int, id);
      request.input('rol_id', mssql.Int, rol_id);
      const result = await request.execute('DeleteUser');
      return { success: true, message: 'User deleted successfully', data: result.recordset };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

};
