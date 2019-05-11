const Command = require('./src/structures/Command')
const Resolver = require('./src/structures/Resolver')

const dispatcher = require('./src/dispatcher')
const commands = require('./src/commands')

module.exports = {
  Command,
  Resolver,

  dispatcher,
  commands,
}
