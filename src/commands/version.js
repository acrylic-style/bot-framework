const { Command } = require('bot-framework')
require('pkginfo')(module, ['version', 'repository', 'name'])
const fs = require('fs')
const pkg = module.exports
const git = require('simple-git/promise')

module.exports = class extends Command {
  constructor() {
    super('version')
  }

  async run(msg) {
    const application = await msg.client.fetchApplication()
    msg.channel.send(`${pkg.name} v${pkg.version} @ ${(await git().revparse(['HEAD'])).slice(0, 7)}
     - Source Code: ${pkg.repository}
     - Bot owner: \`${application.owner.tag}\` (ID: ${application.owner.id})`)
  }
}
