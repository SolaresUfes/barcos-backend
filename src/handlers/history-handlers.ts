import { Socket } from "socket.io";
import { saveFileToStorage } from "../utils/firebase";
import { getDataAtualBrasil } from "../utils/dataProcessing";

export function handleRaceHistory(
  socket: Socket,
  io: any,
  dataHistory: string[],
  record: boolean[],
  speed: string[],
  namePilot: string[]
): void {
  setTimeout(() => {
    socket.emit("recordStatus", record.length > 0);
  }, 3000);

  socket.on("newinfo", (data: string) => {
    if (record.length > 0) {
      const updateAt = getDataAtualBrasil().format('DD/MM/YYYY HH:mm:ss')
      const newData = data + "," + speed[0] + "," + namePilot[0] + "," + updateAt;
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
      saveFileToStorage(dataHistory);
    }
    console.log(record.length > 0);
    io.emit("recordStatus", record.length > 0);
  });
};
