import { Data } from "../interfaces/Data";
import moment from 'moment-timezone';

export function getDataAtualBrasil(): moment.Moment {
  const dataAtual = moment().tz('America/Sao_Paulo');
  return dataAtual;
}

export function convertData(str: string) : Data {
  let array = str.split(",");

  return {
      versao: array[0],
      correnteMotor: array[1],
      correnteBaterias: array[2],
      temperatura: array[3],
      umidade: array[4],
      tensaoAlimentacaoPCB: array[5],
      estadoStringSolar1: array[6],
      estadoStringSolar2: array[7],
      tensaoSaidaMPPT: array[8],
      tensaoEntradaMPPT: array[9],
      correnteMPPT: array[10],
      updateAt: getDataAtualBrasil().format('DD/MM/YYYY HH:mm:ss')
    }  
}
