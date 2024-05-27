import express from "express";
import { read } from "./file.service.js";
import { register, countLogsForLastPeriod, resetCounter } from "./metrics.js";
import { config } from "dotenv";
config();

const logFilePath = process.env.LOG_FILE_PATH;
const SECONDS_IN_HOUR = 60 * 60;
const SECONDS_IN_FIVE_MINUTES = 5 * 60;

const app = express();

app.get("/metrics", async (req, res) => {
  try {
    const logs = read({ filePath: logFilePath });
    countLogsForLastPeriod({
      logs: logs.split(/\n+/).filter(Boolean),
      periodInSeconds: SECONDS_IN_FIVE_MINUTES,
    });
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
    resetCounter();
  } catch (error) {
    console.log(error);
    res.status(500).end("Something went wrong");
  }
});

export { app };
