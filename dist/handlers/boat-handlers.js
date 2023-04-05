"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleBoat = void 0;
const dataProcessing_1 = require("../utils/dataProcessing");
function handleBoat(socket, io) {
    socket.on("newinfo", (data) => {
        // console.log(data);
        const newData = (0, dataProcessing_1.convertData)(data);
        io.emit("info", newData);
    });
}
exports.handleBoat = handleBoat;
;
