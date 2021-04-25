const execCommand = require("./helper")

module.exports = obterTemperatura = async () => {
  try {
    const stringTemperatura = await execCommand("vcgencmd measure_temp");
    const temperaturaTratada = Number(stringTemperatura.replace(/[^\d.]/g, ""));
    return temperaturaTratada;
  } catch (e) {
    return null;
  }
}