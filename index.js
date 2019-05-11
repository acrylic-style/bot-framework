const Command = require(__dirname + '/src/structures/Command')
const Resolver = require(__dirname + '/src/structures/Resolver')

const dispatcher = require(__dirname + '/src/dispatcher')
const commands = require(__dirname + '/src/commands')

module.exports = {
  Command,
  Resolver,

  dispatcher,
  commands,
}
