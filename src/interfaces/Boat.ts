export interface Boat {
  id: string;
  lat: string;
  lng: string;
  speed: string;
  sos: string;
  rotate: number;
  date: string;
  updateAt: Date;
}

export interface Data {
  correnteMotor: string;
  correnteBaterias: string;
  temperatura: string;
  umidade: string;
  tensaoAlimentacaoPCB: string;
  estadoStringSolar1: string;
  estadoStringSolar2: string;
  tensaoSaidaMPPT: string;
  tensaoEntradaMPPT: string;
  correnteMPPT: string;
  updateAt: string;
}

