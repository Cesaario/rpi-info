const execCommand = require("./helper")

module.exports = obterMemoria = async () => {
  try {
    const stringMemoria = await execCommand("free -m | grep Mem");
    const regex = /([\d.]+)/g;
    const memoria = stringMemoria.match(regex).map(el => Number(el));
    return {
      total: memoria[0],
      usado: memoria[1]
    }
  } catch (e) {
    console.log(e)
    return null;
  }
}