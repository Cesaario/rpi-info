const obterTemperatura = require("./temperatura");
const obterMemoria = require("./memoria");
const obterUsoCpu = require("./usoCpu");
const obterClockCpu = require("./clockCpu");
const obterDisco = require("./disco");
const obterThrottle = require("./throttle");
const obterTensao = require("./tensao");
const obterModelo = require("./modelo");

module.exports = {
  obterTemperatura,
  obterMemoria,
  obterUsoCpu,
  obterClockCpu,
  obterDisco,
  obterThrottle,
  obterTensao,
  obterModelo
}