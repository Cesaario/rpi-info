const execCommand = require("./helper")

const GIGA = 1e9;

module.exports = obterClockCpu = async () => {
  try {
    const stringClock = await execCommand("vcgencmd measure_clock arm");
    const clock = Number(stringClock.split("=")[1]) / GIGA;
    return clock;
  } catch (e) {
    return null;
  }
}