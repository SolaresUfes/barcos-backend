import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { configureRoutes } from './server/express';
import { configureSockets } from './server/socket';
import { getLocalIpAddresses } from './utils/network';

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

configureRoutes(app);
configureSockets(io);

const port = process.env.PORT || 4000;

server.listen(port, () => {
  const ipAddress = getLocalIpAddresses()
  console.log(`Servidor rodando em http://${ipAddress}:${port}`);
});
