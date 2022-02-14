// Asi se crea un servidor

import express from "express";
import cors from "cors";
import db from "./db/db.js";
import roleRoutes from "./routers/roleRoutes.js";
import userRoutes from "./routers/userRoutes.js";
import bookRoutes from "./routers/bookRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/role", roleRoutes);
app.use("/api/user", userRoutes);
app.use("/api/book", bookRoutes);


app.listen(process.env.PORT, () =>
console.log("Backend server running on port: ", process.env.PORT)
);

db.dbConnection(); 