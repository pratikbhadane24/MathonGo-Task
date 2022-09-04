import express from "express";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
import { routes } from "./routes";
dotenv.config();

createConnection({
  type: "mongodb",
  url: process.env.MONGODB_URL,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  entities: ["src/entity/*.ts"],
  logging: true,
  synchronize: true,
}).then(() => {
  console.log("Connected to MongoDB🔥🔥");
  const app = express();
  app.use(express.json());

  routes(app);

  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}/`);
  });
});
