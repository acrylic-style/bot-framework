const Discord = require('discord.js') // eslint-disable-line
const { commands } = require(__dirname + '/commands')

async function runCommand(command, msg, lang, owners, ...args) {
  if (!command.enabled) throw new Error(`${command.name} is disabled.`)
  if (!command.isAllowed(msg, owners)) return msg.channel.send(lang.youdonthaveperm)
  await command.start(msg, lang, msg.content.split(/\s{1,}/g), ...args)
}

/**
 * @param {Discord.Message} msg
 * @param {Object} lang
 * @param {string} prefix
 * @param {Array<string>} owners
 * @returns {Promise<void>}
 */
const fu = async (msg, lang, prefix, owners, ...args) => {
  if (msg.author.bot || msg.system) return
  const [cmd] = msg.content.replace(prefix, '').replace(/\s{1,}/gm, ' ').split(' ')
  if (commands[cmd]) await runCommand(commands[cmd], msg, lang, owners, ...args)
}

module.exports = fu
