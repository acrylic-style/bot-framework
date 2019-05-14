const { Command } = require('bot-framework')
const fs = require('fs')
const pkg = fs.existsSync('../package.json')
  ? require('../package.json')
  : (
    fs.existsSync('../../package.json')
      ? require('../../package.json')
      : {version: '???', repository: '???'})
const git = require('simple-git/promise')

module.exports = class extends Command {
  constructor() {
    super('version')
  }

  async run(msg) {
    const application = await msg.client.fetchApplication()
    msg.channel.send(`ServerRanker v${pkg.version} @ ${(await git().revparse(['HEAD'])).slice(0, 7)}\n
     - Source Code: ${pkg.repository}\n
     - Bot owner: \`${application.owner.tag}\` (ID: ${application.owner.id})`)
  }
}
