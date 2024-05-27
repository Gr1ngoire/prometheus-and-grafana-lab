import { collectDefaultMetrics, Counter, Registry } from "prom-client";

const register = new Registry();
collectDefaultMetrics({ register });
const counter = new Counter({
  name: "app",
  help: "count_of_logged_messages_per_last_hour",
  registers: [register],
});

const resetCounter = () => counter.reset();

const countLogsForLastPeriod = ({ logs = [], periodInSeconds = 60 * 60 }) => {
  const periodInMilliSeconds = periodInSeconds * 1000;
  const intervalEnd = new Date().getTime();
  const intervalStart = intervalEnd - periodInMilliSeconds;

  for (const log of logs) {
    const [logDate] = log.split("|");
    const logTimeStamp = new Date(logDate.trim()).getTime();

    if (logTimeStamp > intervalStart && logTimeStamp < intervalEnd) {
      counter.inc();
    }
  }
};

export { register, countLogsForLastPeriod, resetCounter };
