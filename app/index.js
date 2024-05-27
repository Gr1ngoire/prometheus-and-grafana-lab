import { client } from "./bot.js";
import { app } from "./server.js";

const token = process.env.BOT_TOKEN;
const port = process.env.METRICS_SERVER_PORT;

client.login(token);
app.listen(port);
