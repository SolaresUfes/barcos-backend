import { Server } from 'socket.io';
import { handleBoat } from '../handlers/boat-handlers';
import { handleRaceHistory } from '../handlers/history-handlers';

export function configureSockets(io: Server): void {
  let dataHistory: string[] = [];
  let record: boolean[] = [];
  let speed: string[] = ['0'];
  let namePilot: string[] = ['default'];

  io.on('connection', (socket: any) => {
    console.log('new user: ', socket.id);

    socket.on('disconnect', () => {
      console.log('user disconnected: ', socket.id);
    });

    handleBoat(socket, io, speed, namePilot);
    handleRaceHistory(socket, io, dataHistory, record, speed, namePilot)

  });

  io.engine.on("connection_error", (err) => {
    // console.log(err.req);      // the request object
    console.log(err.code);     // the error code, for example 1
    console.log(err.message);  // the error message, for example "Session ID unknown"
    console.log(err.context);  // some additional error context
  });
}
