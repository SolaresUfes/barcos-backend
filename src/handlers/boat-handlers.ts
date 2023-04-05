import { Socket } from "socket.io";
import { convertData } from "../utils/dataProcessing";

export function handleBoat(socket: Socket, io: any) : void {

  socket.on("newinfo", (data: string) => {
    // console.log(data);
    const newData = convertData(data);
    io.emit("info", newData);
  });
};
