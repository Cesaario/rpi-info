const execCommand = require("./helper")

module.exports = obterModelo = async () => {
  try {
    const stringModelo = await execCommand("cat /proc/cpuinfo | grep Model");
    const modelo = stringModelo.split(": ")[1].replace("\n", "");
    return modelo;
  } catch (e) {
    return null;
  }
}