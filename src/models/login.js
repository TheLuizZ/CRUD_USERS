import { getConnection, mssql } from "../config/connectionSQLServer.js";
import { DEFAULT_CONFIG } from "../utils/const.js";

const connectionString = process.env.DB_URL ?? DEFAULT_CONFIG;
const connection = await getConnection(connectionString);

export class LoginModel {

  static async getUserByEmail(email) {
    try {
      const request = connection.request();
      request.input('email', mssql.NVarChar, email.toLowerCase());
      const result = await request.execute('GetUserByEmail');
      return { success: true, message: 'User found successfully', data: result.recordset[0] };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
  
}