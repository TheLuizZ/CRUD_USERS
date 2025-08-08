// config constants for database connection sql server
export const DEFAULT_CONFIG = {
  server: "localhost",
  database: "CRUD_Users",
  user: "sa2",
  password: "Pass123%@",
  options: {
    encrypt: true, // Use encryption for the connection
    trustServerCertificate: true, // Change to false in production
  },
};