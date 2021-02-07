import { join } from "path";
import express from "express";
import socketIO from "socket.io";
import logger from "morgan";
import socketController from "./socketController";
import events from "./events";

const PORT = 4000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.static(join(__dirname, "static")));
app.get("/", (req, res) =>
  res.render("home", { events: JSON.stringify(events) })
);

app.get("/chat", (req, res) => {
  const { id, enemy } = req.query;
  if (!id && !enemy) res.render("home", { events: JSON.stringify(events) });

  return res.render("chat", { events: JSON.stringify(events), id, enemy });
});

const handleListening = () =>
  console.log(`Listening in  http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);

const io = socketIO(server);

io.on("connection", (socket) => socketController(socket));
