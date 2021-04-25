const { exec } = require("child_process");

module.exports = execCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error)
        reject(`Erro ${error} ${stderr}`);
      resolve(stdout);
    })
  })
}
