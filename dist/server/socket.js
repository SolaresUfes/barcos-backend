"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureSockets = void 0;
const boat_handlers_1 = require("../handlers/boat-handlers");
const history_handlers_1 = require("../handlers/history-handlers");
function configureSockets(io) {
    let dataHistory = [];
    let record = [];
    let speed = ['0'];
    let namePilot = ['default'];
    io.on('connection', (socket) => {
        console.log('new user: ', socket.id);
        socket.on('disconnect', () => {
            console.log('user disconnected: ', socket.id);
        });
        (0, boat_handlers_1.handleBoat)(socket, io, speed, namePilot);
        (0, history_handlers_1.handleRaceHistory)(socket, io, dataHistory, record, speed, namePilot);
        setInterval(() => {
            console.log('Emitiu evento');
            io.emit('my-event', 'Hello World!');
        }, 1000);
    });
    io.engine.on("connection_error", (err) => {
        // console.log(err.req);      // the request object
        console.log(err.code); // the error code, for example 1
        console.log(err.message); // the error message, for example "Session ID unknown"
        console.log(err.context); // some additional error context
    });
}
exports.configureSockets = configureSockets;
