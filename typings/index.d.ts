import { Message, Permissions, Snowflake, GuildMember, User, ClientUser, Role, VoiceChannel, TextChannel, GuildChannel, Channel } from "discord.js";

declare module 'bot-framework' {
  /**
   * A command class for define commands.
   */
  export class Command {
    /**
     * Initializes this Command Instance.
     *
     * If you didn't extend this class, your command won't work.
     * @param {string} name Command name
     * @param {CommandOptions} options options
     * @constructor
     */
    constructor(name: string, options?: CommandOptions)

    /**
     * @returns current options
     */
    get options(): CommandOptions

    /**
     * Note: This method is abstract and can be overridden by classes(e.g. arguments).
     * **Do not run this method manually.**
     * @async
     * @abstract
     */
    run(msg: Message, lang: object, args: Array<string>, sendDeletable: Promise<void>, ...customargs: any): Promise<any>

    /**
     * @async
     * @param msg A discord message
     * @param lang Language object
     * @param cargs String array of arguments list
     * @param args A custom arguments passes to each command.
     */
    start(msg: Message, lang: object, cargs: Array<string>, ...args: any): Promise<any>

    /**
     * @param msg A discord message
     * @param owners String array of owner list
     */
    isAllowed(msg: Message, owners: Array<string>): boolean

    /**
     * Options for command. Not recommended.
     */
    _options: CommandOptions

    /**
     * Name of this command.
     */
    name: string

    /**
     * Changes where commands are allowed to run.
     */
    allowedIn: ["TextChannel", "DMChannel", "GroupDMChannel"]

    /**
     * Is enabled this command or not
     */
    enabled: boolean

    /**
     * Alias of this command
     */
    alias: Array<string>

    /**
     * Argument list of this command. Used in help command.
     */
    args: Array<string>

    /**
     * Is user must be bot owner for a run this command
     */
    requiredOwner: boolean

    /**
     * Required permissions for run command.
     */
    permission: Permissions
  }

  /**
   * Lock class for synchronized running of function.
   */
  export class Lock {
    /**
     * Initialize this lock.
     */
    constructor()

    /**
     * Locks this lock.
     */
    lock(): void

    /**
     * Unlocks this lock.
     */
    unlock(): void

    /**
     * Schedule the function and will run later when lock is available.
     * @param func Function or Promise to run later.
     */
    schedule(func: Function | Promise<any>): Promise<any>

    /**
     * Starts running of interval. Will be cancelled automatically when there are no schedules.
     * @async
     */
    __runInterval(): Promise<void>

    /**
     * Cancels ongoing interval, and reset _interval.
     */
    __clearInterval(): void

    /**
     * Is the this lock locked?
     */
    _lock: boolean

    /**
     * Current ongoing async interval ID.
     */
    _interval: number

    /**
     * List of functions or async functions for run later.
     */
    schedules: Array<Function | Promise<any>>

    /**
     * List of promises for resolve or reject later.
     */
    _promises: Array<Promise<any>>
  }

  /**
   * A resolver for resolve anything.
   */
  export class Resolver {
    /**
     * Resolves a UserResolvable to a User object.
     * @example toUser(msg, args[1])
     * @param {Message} msg A message that you want to resolve to author.
     * @param {UserResolvable} user A user resolvable object you want to resolve.
     * @param {User?} fallback Fallback user for this method.
     */
    public static toUser(msg: Message, user: UserResolvable, fallback: User?): ?User | ?ClientUser

    /**
     * Resolves a MemberResolvable to a Member object.
     * @example toMember(msg, args[1])
     * @param {Message} msg A message that you want to resolve to author.
     * @param {MemberResolvable} member A member resolvable object you want to resolve.
     * @param {GuildMember?} fallback Fallback member for this method.
     */
    public static toMember(msg: Message, member: MemberResolvable, fallback: GuildMember?): ?GuildMember

    /**
     * Resolves a RoleResolvable to a Role object.
     * @example toRole(msg, args[1])
     * @param {Message} msg A message that you want to resolve to first mentioned role.
     * @param {RoleResolvable} role A role resolvable object you want to resolve.
     * @param {Role?} fallback Fallback role for this method.
     */
    public static toRole(msg: Message, role: RoleResolvable, fallback: Role?): ?Role

    /**
     * Resolves a ChannelResolvable to a Channel object.
     * @example toChannel(msg, msg.channel)
     * @param {Message} msg A message for use msg.client
     * @param {ChannelResolvable} channel A channel resolvable object you want to resolve.
     * @param {Channel?} fallback Fallback channel for this method.
     */
    public static toChannel(msg: Message, channel: ChannelResolvable, fallback: Channel?): ?Channel

    /**
     * Resolves a ChannelResolvable to a GuildChannel object.
     * @example toGuildChannel(msg, msg.channel)
     * @param {Message} msg A message for use msg.client
     * @param {ChannelResolvable} channel A channel resolvable object you want to resolve.
     * @param {GuildChannel?} fallback Fallback channel for this method.
     */
    public static toGuildChannel(msg: Message, channel: ChannelResolvable, fallback: GuildChannel?): ?GuildChannel

    /**
     * Resolves a ChannelResolvable to a TextChannel object.
     * @example toTextChannel(msg, msg.channel)
     * @param {Message} msg A message for use msg.client
     * @param {ChannelResolvable} channel A channel resolvable object you want to resolve.
     * @param {TextChannel?} fallback Fallback channel for this method.
     */
    public static toTextChannel(msg: Message, channel: ChannelResolvable, fallback: TextChannel?): ?TextChannel

    /**
     * Resolves a ChannelResolvable to a VoiceChannel object.
     * @example toVoiceChannel(msg, msg.channel)
     * @param {Message} msg A message for use msg.client
     * @param {ChannelResolvable} channel A channel resolvable object you want to resolve.
     * @param {VoiceChannel?} fallback Fallback channel for this method.
     */
    public static toVoiceChannel(msg: Message, channel: ChannelResolvable, fallback: VoiceChannel?): ?VoiceChannel
  }

  export class AtomicReference<T> {
    /**
     * Constructs AtomicReference with default value if any.
     * @param defaultValue default value for this.
     */
    constructor(defaultValue?: T)

    /**
     * Fetches current value.
     */
    get(): Promise<T>

    /**
     * Change value to the new value.
     * @param value New value
     */
    set(value?: T): Promise<void>

    /**
     * Increment value then return.
     * **Returns NaN if value isn't number.**
     */
    incrementAndReturn(): Promise<number>

    /**
     * Return then increment value.
     * **Returns NaN if value isn't number.**
     */
    returnAndIncrement(): Promise<number>

    /**
     * Decrement value then return.
     * **Returns NaN if value isn't number.**
     */
    decrementAndReturn(): Promise<number>

    /**
     * Return then decrement value.
     * **Returns NaN if value isn't number.**
     */
    returnAndDecrement(): Promise<number>
  }

  /**
   * Data that Resolves to give a User object. This can be:
   * * A Snowflake
   * * A User name
   * * A GuildMember instance
   * * A User instance
   * * A ClientUser instance
   */
  export type UserResolvable = Snowflake | string | GuildMember | User | ClientUser

  /**
   * Data that resolves to give a Member object. This can be:
   * * A Snowflake
   * * A Member name
   * * A GuildMember instance
   * * A User instance
   * * A ClientUser instance
   */
  export type MemberResolvable = Snowflake | string | GuildMember | User | ClientUser

  /**
   * Data that Resolves to give a Role object. This can be:
   * * A Snowflake
   * * A Role name
   * * A Role instance
   */
  export type RoleResolvable = Snowflake | string | Role

  /**
   * Data that Resolves to give a Channel object. This can be:
   * * A Snowflake
   * * A Channel name
   * * A GuildChannel instance
   * * A TextChannel instance
   * * A VoiceChannel instance
   * * A Channel instance
   */
  export type ChannelResolvable = Snowflake| string | Channel | GuildChannel | TextChannel | VoiceChannel
  
  /**
   * Command options for modify behavior to the command.
   */
  export type CommandOptions = {
    /**
     * Changes where commands are allowed to run.
     */
    allowedIn?: ["TextChannel", "DMChannel", "GroupDMChannel"]

    /**
     * Is enabled this command or not
     */
    enabled?: boolean

    /**
     * Alias of this command
     */
    alias?: Array<string>

    /**
     * Argument list of this command. Used in help command.
     */
    args?: Array<string>

    /**
     * Is user must be bot owner for a run this command
     */
    requiredOwner?: boolean

    /**
     * Required permissions for run command.
     */
    permission?: Permissions
  }
}
