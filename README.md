# Servidor (backend) da telemetria dos barcos

## Pré-requisitos
- Ter o Nodejs instalado na máquina [Baixar última versão LTS](https://nodejs.org/en)

## Instalação
- Clonar o repositório: `git clone https://github.com/ProjetoSolaresUfes/barcos-backend.git`
- Entrar na pasta do projeto: `cd barcos-backend`
- Instalar as dependências: `npm install`
- Iniciar o servidor: `npm run dev`
- O servidor mostrará no terminal o endereço de acesso: `http://SEU_IP:4000`
  - Ou você pode acessar o endereço `http://localhost:4000`

## Configuração do banco de dados (Firebase)
Para que as informações sejam salvas no banco de dados, é necessário criar um arquivo chamado `.env` na raiz do projeto, com o seguinte conteúdo:
```
STORAGE_BUCKET = ''
PROJECT_ID = ''
CLIENT_EMAIL = ''
PRIVATE_KEY = ''
```
- O STORAGE_BUCKET pode ser encontrado no console do Firebase, clicando na engrenagem no canto superior esquerdo, e depois em "Configurações do projeto". O valor é o nome do projeto, seguido de ".appspot.com". Ele se parece com isso: `barcos-ufes.appspot.com` e pode ser encontrado no "Geral" do projeto.
- Todos os outros valores podem ser encontrados no console do Firebase, clicando na engrenagem no canto superior esquerdo, e depois em "Configurações do projeto". Clicar em "Contas de serviço" e depois em "Gerar nova chave privada". O arquivo gerado será um JSON, e os valores devem ser copiados e colados no arquivo `.env` criado anteriormente.

## Rotas do servidor HTTP
- `http://localhost:4000/`: Rota principal do servidor. Retorna uma mensagem: "Servidor online" se o servidor estiver funcionando.
- `http://localhost:4000/info`: Rota que exibe em tempo real as informações recebidas do barco. É mostrado os últimos dados recebidos de cada sensor do barco em formato JSON.

## Rotas do servidor Socket.io
### Enviadas do cliente para o servidor:
- "newinfo" - Envia as informações do barco para o servidor. As informações devem ser enviadas em formato string separando os dados por vírgula. Ex.: 
```js
socket.emit("newinfo", "correnteMotor,correnteBaterias,temperatura,umidade,tensaoAlimentacaoPCB,estadoStringSolar1,estadoStringSolar2,tensaoSaidaMPPT,tensaoEntradaMPPT,correnteMPPT");
```
- "record" - Envia um comando para o servidor iniciar e/ou parar a gravação dos dados recebidos. Ex.: 
```js
socket.emit("record");
```

### Enviadas do servidor para o cliente:
- "info" - Envia as informações tratadas do barco para o cliente. As informações são enviadas em formato JSON. Ex.: 
```js
const newData = {
  correnteMotor: 0,
  correnteBaterias: 0,
  temperatura: 0,
  umidade: 0,
  tensaoAlimentacaoPCB: 0,
  estadoStringSolar1: 0,
  estadoStringSolar2: 0,
  tensaoSaidaMPPT: 0,
  tensaoEntradaMPPT: 0,
  correnteMPPT: 0,
  updateAt: "00/00/0000 00:00:00"
}
io.emit("info", newData);
```