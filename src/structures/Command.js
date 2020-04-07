const { Permissions } = require('discord.js')
const { floppy_disk: { char } } = require('emojilib/emojis')

class Command {
  constructor(name, options = {}) {
    if (!name) throw new TypeError('You must specify command name.')
    this.name = name

    this._options = Object.assign({
      alias: [],
      args: [],
      permission: 0,
      allowedIn: ['TextChannel', 'DMChannel', 'GroupDMChannel'],
      requiredOwner: false,
      enabled: true,
    }, options)

    this.allowedIn = this._options.allowedIn
    this.enabled = this._options.enabled
    this.alias = this._options.alias
    this.args = this._options.args
    this.requiredOwner = this._options.requiredOwner
    this.permission = new Permissions(this._options.permission).freeze()
  }

  get options() {
    return this._options
  }

  set options(val) {
    throw new Error(`${val} was passed but this property is read-only.`)
  }

  async run() {}

  async start(msg, lang, cargs, ...args) {
    if (!this.allowedIn.includes(msg.channel.constructor.name)) return msg.channel.send(`This command is only available in ${this.allowedIn.join(', ')}.`)
    const sendDeletable = async (...args) => {
      const message = await msg.channel.send(...args)
      message.react(char)
      const filter = (reaction, user) => reaction.emoji.name === char && !user.bot
      message.awaitReactions(filter, { time: 10000 })
        .then(collected => {
          if (!collected.size) message.delete()
          else message.reactions.removeAll().catch(()=>{})
        })
    }
    return await this.run(msg, lang, cargs, sendDeletable, ...args)
  }

  isAllowed(msg, owners) {
    if (this.requiredOwner) return owners.includes(msg.author.id)
    else if (!msg.guild) return true
    else if (msg.member.hasPermission(this.permission.bitfield)) return true
    else if (owners.includes(msg.author.id)) {
      msg.channel.send('Note: You\'re bypassing permission because you\'re listed as bot owner.')
      return true
    } else return false
  }
}

module.exports = Command
