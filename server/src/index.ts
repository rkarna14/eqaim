import { AppDataSource } from "./dataSource";

import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";

import RespondError from "./middlewares/respondError";
import stepsRouter from "./steps/steps.route";

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use("/steps", stepsRouter);

app.use(RespondError);

app.listen(port, async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database handler initialized");
  } catch (err) {
    console.log("Error initializing database handler");
    console.log(err);
  }
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
