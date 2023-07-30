import { Express, Request, Response } from 'express';
import * as path from 'path';
import { gptResponse } from '../utils/chatgpt';

export function configureRoutes(app: Express): void {
  app.get('/', (req: Request, res: Response) => {
    res.status(200).send({ message: 'Servidor online TESTE RSRSRSRS' });
  });

  app.get('/info', (req: Request, res: Response) => {
    // get the index.html file in ../views/index.html
    const indexPath = path.join(__dirname, '..', 'views', 'index.html');
    res.sendFile(indexPath);
  });

  app.post('/gpt', async (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('X-Accel-Buffering', 'no');
    console.log('GPT request received');
    const { prompt } = req.body;
    if(!prompt) return res.end();
    try {
      await gptResponse(prompt, res);
      console.log('GPT response sent');
    } catch (error) {
      console.log(error);
      res.write('Estou com dificuldades para responder, tente novamente mais tarde.')
      res.write(`Status erro: ${error}`)
      res.end();
    }
  });
}
