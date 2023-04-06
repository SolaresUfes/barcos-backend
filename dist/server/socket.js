"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureSockets = void 0;
const boat_handlers_1 = require("../handlers/boat-handlers");
const history_handlers_1 = require("../handlers/history-handlers");
function configureSockets(io) {
    let dataHistory = [];
    let record = [];
    io.on('connection', (socket) => {
        console.log('new user: ', socket.id);
        socket.on('disconnect', () => {
            console.log('user disconnected: ', socket.id);
        });
        (0, boat_handlers_1.handleBoat)(socket, io);
        (0, history_handlers_1.handleRaceHistory)(socket, io, dataHistory, record);
    });
}
exports.configureSockets = configureSockets;
