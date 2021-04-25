const execCommand = require("./helper")

module.exports = obterUsoCpu = async () => {
  try {
    const stringCpu = await execCommand("top -n 1 -b | grep \"%Cpu\"");
    const regex = /([\d.]+)/g;
    const cpu = stringCpu.match(regex).map(el => Number(el));
    return {
      user: cpu[0],
      system: cpu[1],
      idle: cpu[3]
    }
  } catch (e) {
    return null;
  }
}