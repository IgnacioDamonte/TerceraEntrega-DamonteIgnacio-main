import dotenv from "dotenv"
import __dirname from "../utils.js"

dotenv.config()

export const PORT = process.env.PORT || 8080
export const MONGO_URL = process.env.MONGO_URL
export const MONGO_DBNAME = process.env.MONGO_DBNAME
export const PERSISTENCE = process.env.PERSISTENCE