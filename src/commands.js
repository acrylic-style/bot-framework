const fs = require('fs')
const commands = {}

if (!fs.existsSync('./commands')) fs.mkdirSync('./commands')
if (!fs.existsSync('./commands/eval.js'))
  fs.writeFileSync('./commands/eval.js', fs.readFileSync(`${__dirname}/commands/eval.js`))
if (!fs.existsSync('./commands/version.js'))
  fs.writeFileSync('./commands/version.js', fs.readFileSync(`${__dirname}/commands/version.js`))

if (!fs.existsSync('./lang')) fs.mkdirSync('./lang')
if (!fs.existsSync('./lang/en.json'))
  fs.writeFileSync('./lang/en.json', fs.readFileSync(`${__dirname}/lang/en.json`))

const commandsdir = require('path').resolve('./commands/')+'/'
const files = fs.readdirSync(commandsdir)
function setCommand(file, reload) {
  if (reload) delete require.cache[require.resolve(`./commands/${file.replace(/\.\./gm, '')}`)]
  const rawcommand = require(`${commandsdir}${file}`)
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
