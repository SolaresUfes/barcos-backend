import { Data } from "../interfaces/Data";
import moment from 'moment-timezone';

export function getDataAtualBrasil(): moment.Moment {
  const dataAtual = moment().tz('America/Sao_Paulo');
  return dataAtual;
}

export function convertData(str: string) : Data {
  let array = str.split(",")

  return {
      correnteMotor: array[0],
      correnteBaterias: array[1],
      temperatura: array[2],
      umidade: array[3],
      tensaoAlimentacaoPCB: array[4],
      estadoStringSolar1: array[5],
      estadoStringSolar2: array[6],
      tensaoSaidaMPPT: array[7],
      tensaoEntradaMPPT: array[8],
      correnteMPPT: array[9],
      updateAt: getDataAtualBrasil().format('DD/MM/YYYY HH:mm:ss')
    }  
}
