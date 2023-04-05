"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const express_2 = require("./server/express");
const socket_1 = require("./server/socket");
const network_1 = require("./utils/network");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    }
});
(0, express_2.configureRoutes)(app);
(0, socket_1.configureSockets)(io);
const port = process.env.PORT || 4000;
server.listen(port, () => {
    const ipAddress = (0, network_1.getLocalIpAddresses)();
    console.log(`Servidor rodando em http://${ipAddress}:${port}`);
});
