import { Express, Request, Response } from 'express';
import * as path from 'path';
import { gptResponse } from '../utils/chatgpt';
import { getFile, getFileMetadata, saveFile } from '../utils/firebase';
import multer from 'multer';
import { Server } from 'socket.io';

export function configureRoutes(app: Express, io: Server): void {
  app.get('/', (req: Request, res: Response) => {
    res.status(200).send({ message: 'Servidor online' });
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
    if (!prompt) return res.end();
    try {
      await gptResponse(prompt, res);
      console.log('GPT response sent');
    } catch (error) {
      console.log(error);
      res.write('Estou com dificuldades para responder, tente novamente mais tarde.');
      res.write(`Status erro: ${error}`);
      res.end();
    }
  });

  const storage = multer.memoryStorage();
  const upload = multer({ storage });
  // Endpoint to receive file
  app.post('/uploadOTA', upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    console.log(req.file);
    
    await saveFile(req.file, io);

    res.status(200).send('File uploaded successfully.');
  });

  app.get('/downloadOTA', async (req, res) => {
    const fileName = 'OTA_esp32_Firmware.ino.bin';

    try {
      const metadata = await getFileMetadata(fileName);
      const fileStream = await getFile(fileName);

      // Verificar se metadata.size está definido
      if (metadata.size !== undefined) {
        res.setHeader('Content-Length', metadata.size);
      } else {
        console.error(`Tamanho do arquivo ${fileName} não disponível nos metadados`);
        return res.status(500).send('Erro: Tamanho do arquivo não disponível');
      }

      // Configurar cabeçalhos adicionais (opcional)
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

      // Enviar o arquivo
      fileStream.pipe(res);
    } catch (error) {
      console.error('Erro ao baixar o arquivo:', error);
      res.status(500).send('Erro interno ao processar o download');
    }
  });
}
