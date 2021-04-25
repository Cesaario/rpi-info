const execCommand = require("./helper")

const hex2bin = (hex) => {
  return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

module.exports = obterThrottle = async () => {
  try {
    const stringThrottle = await execCommand("vcgencmd get_throttled");
    const throttle = hex2bin(stringThrottle.split("0x")[1]).split("").reverse().map(el => el === "0" ? false : true);
    return {
      throttled: throttle[2],
      baixaTensao: throttle[0],
      frequenciaLimitada: throttle[1],
      limiteTemperatura: throttle[3]
    }
  } catch (e) {
    return null;
  }
}