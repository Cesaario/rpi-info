const execCommand = require("./helper")

module.exports = obterEspacoDisco = async () => {
  try {
    const stringDisco = await execCommand("df -Bm | grep /dev/root");
    const regex = /([\d.]+)/g;
    const disco = stringDisco.match(regex).map(el => Number(el));
    return {
      total: disco[0],
      usado: disco[1]
    }
  } catch (e) {
    return null;
  }
}