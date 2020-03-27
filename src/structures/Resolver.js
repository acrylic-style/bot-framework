const Discord = require('discord.js')

class Resolver {
  static toUser(msg, user, fallback) {
    if (user.constructor.name === 'GuildMember') return user.user
    if (user.constructor.name === 'User' || user.constructor.name === 'ClientUser') return user
    if (msg.client.users.cache.has(user)) return msg.client.users.cache.get(user)
    if (msg.client.users.cache.find(u => u.username === user)) return msg.client.users.cache.find(u => u.username === user)
    if (msg.mentions.users.size) return msg.mentions.users.first()
    if (fallback) return fallback
    return null
  }

  static toMember(msg, member, fallback) {
    if (member.constructor.name === 'GuildMember') return member
    if (member.constructor.name === 'User' || member.constructor.name === 'ClientUser') 
      if (msg.guild.members.cache.has(member.id)) return msg.guild.members.cache.get(member.id)
    if (msg.guild.members.cache.has(member)) return msg.client.members.cache.get(member)
    if (msg.guild.members.cache.find(u => u.username === member)) return msg.client.members.cache.find(u => u.username === member)
    if (msg.mentions.members.size) return msg.mentions.members.first()
    if (msg.member) return msg.member
    if (fallback) return fallback
    return null
  }

  static toRole(msg, role, fallback) {
    if (role.constructor.name === 'Role') return role
    if (msg.guild.roles.has(role)) return msg.client.roles.get(role)
    if (msg.guild.roles.cache.find(r => r.username === role)) return msg.client.roles.cache.find(r => r.username === role)
    if (msg.mentions.roles.size) return msg.mentions.roles.first()
    if (fallback) return fallback
    return null
  }

  static toChannel(msg, channel, fallback) {
    if (channel.constructor.name === 'Channel' || channel.constructor.name === 'GuildChannel' || channel.constructor.name === 'TextChannel' || channel.constructor.name === 'VoiceChannel') return channel
    if (msg.guild.channels.cache.has(channel)) return msg.client.channels.cache.get(channel)
    if (msg.guild.channels.cache.find(c => c.name === channel)) return msg.client.channels.cache.find(c => c.name === channel)
    if (msg.mentions.channels.size) return msg.mentions.channels.first()
    if (fallback) return fallback
    return null
  }

  /**
    * Resolves a ChannelResolvable to a Channel object.
    * @example toGuildChannel(msg, msg.channel)
    * @param {Discord.Message} msg
    * @param {Discord.ChannelResolvable} channel
    * @param {?Discord.GuildChannel} fallback The Channel of fallback
    * @returns {?Discord.GuildChannel}
    */
  static toGuildChannel(msg, channel, fallback) {
    if (!msg.guild) return null
    const _channel = this.toChannel(msg, channel, fallback)
    if (!_channel || !msg.guild.channels.cache.has(_channel.id)) return null
    return _channel
  }

  /**
    * Resolves a ChannelResolvable to a TextChannel object.
    * @example toTextChannel(msg, msg.channel)
    * @param {Discord.Message} msg
    * @param {ChannelResolvable} channel
    * @param {?Discord.TextChannel} fallback The TextChannel of fallback
    * @returns {?Discord.TextChannel}
    */
  static toTextChannel(msg, channel, fallback) {
    const _channel = this.toGuildChannel(msg, channel, fallback)
    if (_channel instanceof Discord.TextChannel) return _channel
    return null
  }

  /**
    * Resolves a ChannelResolvable to a VoiceChannel object.
    * @example toVoiceChannel(msg, args[1])
    * @param {Discord.Message} msg
    * @param {ChannelResolvable} channel
    * @param {?Discord.VoiceChannel} fallback The VoiceChannel of fallback
    * @returns {?Discord.VoiceChannel}
    */
  static toVoiceChannel(msg, channel, fallback) {
    const _channel = this.toGuildChannel(msg, channel, fallback)
    if (_channel instanceof Discord.VoiceChannel) return _channel
    return null
  }

}

module.exports = Resolver
