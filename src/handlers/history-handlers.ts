// import { Socket } from "socket.io";
// import { Boat } from "../interfaces/Boat";
// import { convertData } from "../utils/dataProcessing";
// import { saveFileToStorage } from "../utils/firebase";

// export function handleRaceHistory(socket: Socket, io: any, boatsHistory: string[], record: boolean[]) : void {
//   setTimeout(() => {
//     socket.emit("recordStatus", record.length > 0);
//   }, 3000);

//   socket.on("newinfo", (data: string) => {
//     if(record.length > 0) {
//       const newData = convertData(data)
//       const newDataString = `${newData[0].id},${newData[0].lat},${newData[0].lng},${newData[0].speed},${newData[0].sos},${newData[0].rotate},${newData[0].date}`;
//       console.log(newDataString);
//       boatsHistory.push(newDataString);
//     }
//   });

//   socket.on("record", () => {
//     if(record.length === 0) {
//       record.push(true);
//     }
//     else {
//       record.pop();
//       saveFileToStorage(boatsHistory);
//     }
//     console.log(record.length > 0);
//     io.emit("recordStatus", record.length > 0);
//   });
// };
