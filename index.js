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

const server = new ws.Server({ port: 8000 });

let sockets = [];

server.on("connection", (socket) => {
  sockets.push(socket);
});

server.on("close", (socket) => {
  sockets = sockets.filter((s) => s !== socket);
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
    const informacoes = await obterInformacoes();
    console.log(informacoes);

    await delay(1000);
  }
}
main();

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