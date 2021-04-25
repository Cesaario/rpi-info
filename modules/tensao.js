const execCommand = require("./helper")

module.exports = obterTensao = async () => {
  try {
    const stringTensao = await execCommand("vcgencmd measure_volts core");
    const tensaoTratada = Number(stringTensao.replace(/[^\d.]/g, ""));
    return tensaoTratada;
  } catch (e) {
    return null;
  }
}