import { Express, Request, Response } from 'express';
import * as path from 'path';

export function configureRoutes(app: Express): void {
  app.get('/', (req: Request, res: Response) => {
    res.status(200).send({ message: 'Servidor online' });
  });

  app.get('/info', (req: Request, res: Response) => {
    // get the index.html file in ../views/index.html
    const indexPath = path.join(__dirname, '..', 'views', 'index.html');
    res.sendFile(indexPath);
  });
}
