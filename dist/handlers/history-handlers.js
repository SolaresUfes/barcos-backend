"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRaceHistory = void 0;
const firebase_1 = require("../utils/firebase");
const dataProcessing_1 = require("../utils/dataProcessing");
function handleRaceHistory(socket, io, dataHistory, record, speed) {
    setTimeout(() => {
        socket.emit("recordStatus", record.length > 0);
    }, 3000);
    socket.on("newinfo", (data) => {
        if (record.length > 0) {
            const updateAt = (0, dataProcessing_1.getDataAtualBrasil)().format('DD/MM/YYYY HH:mm:ss');
            const newData = data + "," + speed[0] + "," + updateAt;
            console.log(newData);
            dataHistory.push(newData);
        }
    });
    socket.on("record", () => {
        if (record.length === 0) {
            record.push(true);
        }
        else {
            record.pop();
            (0, firebase_1.saveFileToStorage)(dataHistory);
        }
        console.log(record.length > 0);
        io.emit("recordStatus", record.length > 0);
    });
}
exports.handleRaceHistory = handleRaceHistory;
;
