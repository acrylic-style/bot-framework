const fs = require('fs')
const commands = {}

const files = fs.readdirSync('./commands/')
function setCommand(file, reload) {
  if (!fs.existsSync('./commands/eval.js')) {
    fs.writeFileSync('./commands/eval.js', fs.readFileSync(`${__dirname}/commands/eval.js`))
  }
  if (reload) delete require.cache[require.resolve(`./commands/${file.replace(/\.\./gm, '')}`)]
  const rawcommand = require(`./commands/${file}`)
  if (typeof rawcommand != 'function') return
  const command = new rawcommand()
  if (rawcommand.constructor.name === 'Command') return
  commands[command.name] = command
  for (const alias of command.alias) {
    if (commands[alias] && !reload)
      throw new ReferenceError(`The ${command.name} alias ${alias} is already used.`)
    commands[alias] = command
  }
}

for (const file of files) if (file.endsWith('.js')) setCommand(file)

module.exports = {
  commands,
  reloadAll() {
    const newfiles = fs.readdirSync('./commands/')
    for (const file of newfiles) if (file.endsWith('.js')) setCommand(file, true)
  },
}
