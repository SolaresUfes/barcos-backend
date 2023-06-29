import { Response } from 'express';
import { Configuration, OpenAIApi } from 'openai'
import * as dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({ apiKey: process.env.OPENAI_KEY });
const openai = new OpenAIApi(configuration);

export async function gptResponse(promptText: string, res: Response) {
  if(!promptText) {
    res.end();
    throw new Error('No prompt text');
  }
  console.log('Prompt text', promptText);

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{role: "user", content: promptText}],
      temperature: 0.9,
      stream: true,
    }, { responseType: 'stream' }) as any;
  
    completion.data.on('data', (data: any) => {
      const lines = data.toString().split('\n').filter((line: string) => line.trim() !== '');
      for (const line of lines) {
        const message = line.replace(/^data: /, '');
        // console.log(message)
        if (message === '[DONE]') {
          console.log('Stream finished');
          return res.end();
        }
        try {
          const parsed = JSON.parse(message);
          const content = parsed.choices[0].delta.content;
          console.log(content);
          if(content) {
            // res.write(`data: ${content}\n\n`);
            res.write(content);
          }
        } catch (error) {
          console.error('Could not JSON parse stream message', message, error);
          throw error;
        }
      }
    })
  }
  catch (error) {
    console.error('Error in gptResponse', error);
    throw error;
  }
}