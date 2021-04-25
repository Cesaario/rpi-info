const ws = require("ws");
const {
  obterTemperatura,
  obterMemoria,
  obterUsoCpu,
  obterClockCpu,
  obterDisco,
  obterThrottle,
  obterTensao,
  obterModelo,
} = require("./modules");

const server = new ws.Server({ port: process.env.PORT });

let sockets = [];

server.on("connection", (socket) => {
  sockets.push(socket);
  console.log("Nova conexão!");
  console.log("Clientes conectados: " + sockets.length);
  socket.on("close", () => {
    console.log("Conexão fechada!");
    sockets = sockets.filter(s => s !== socket);
    console.log("Clientes conectados: " + sockets.length);
  })
});

const obterInformacoes = async () => {
  const promises = await Promise.allSettled([
    obterTemperatura(), obterMemoria(), obterUsoCpu(), obterClockCpu(), obterDisco(), obterThrottle(), obterTensao(), obterModelo()
  ]);

  const [
    temperatura, memoria, usoCpu, clockCpu, disco, throttle, tensao, modelo
  ] = promises.map(promise => promise.value);

  return {
    temperatura, memoria, usoCpu, clockCpu, disco, throttle, tensao, modelo
  };
}

const delay = async (tempoDelay) => new Promise((res) => setTimeout(() => res(), tempoDelay));

const main = async () => {
  while(true){
    const informacoes = sockets.length > 0 ? await obterInformacoes() : null;
    sockets.forEach(s => s.send(JSON.stringify(informacoes)))
    await delay(1000);
  }
}

main();
console.log(`Iniciando na porta ${process.env.PORT}...`)

/*
  Temperatura,      vcgencmd measure_temp
  Memória RAM,      free -m
  CPU %,            top -n 1 | grep "%Cpu"
  CPU Clock,        vcgencmd measure_clock arm
  Disco,            df -Bm | grep /dev/root
  Throttle,         vcgencmd get_throttled
  Tensão,           vcgencmd measure_volts core,
  Modelo            cat /proc/cpuinfo | grep Model
*/