import { Server } from 'socket.io';
import { handleBoat } from '../handlers/boat-handlers';
// import { handleRaceHistory } from '../handlers/history-handlers';

export function configureSockets(io: Server): void {
  let boatsHistory: string [] = [];
  let record: boolean [] = [];

  io.on('connection', (socket: any) => {
    console.log('new user: ', socket.id);

    socket.on('disconnect', () => {
      console.log('user disconnected: ', socket.id);
    });

    handleBoat(socket, io);
    // handleRaceHistory(socket, io, boatsHistory, record)
  });
}
