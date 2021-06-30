import express from "express";
import cors from "cors";
import morgan from "morgan"; 
import "./config/db/dbConnection";
import "./config/rabbitMQ/rabbitMQ";
import AppRoutes from "./routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api", AppRoutes);

const PORT = process.env.PORT;
const handleListening = () => {
  console.log(`Server is running on port ${PORT}`);
};
app.listen(PORT, handleListening);
