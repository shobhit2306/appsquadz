import { existsSync } from "fs";
import dotenv from "dotenv";
dotenv.config();

if (!existsSync(".env")) {
  throw new Error("Env not found");
}
const defaultConfig = {
  environment: String(process.env.ENV),
  serverPort: Number(process.env.PORT),
  databaseUri: String(process.env.DB_URI),
  databaseName: String(process.env.DB_NAME),
  jwtExpiry: Number(process.env.JWT_EXPIRY),
  jwtIss: "AppSq",
  jwtSecret: "Appsquadz",
  appTimezone: "UTC", 
 
}

export default defaultConfig;
