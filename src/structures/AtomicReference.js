const Lock = require('./Lock')

class AtomicReference {
  constructor(defaultValue = null) {
    /**
     * A value for this atomic reference. Shouldn't be accessed directly.
     */
    this._value = defaultValue
    this._lock = new Lock()
  }

  /**
   * Gets value
   * @returns {Promise<any>} value
   */
  async get() {
    return await this._lock.schedule(() => { return this._value })
  }
  
  /**
   * Set value to new value
   * @param {any} value
   */
  async set(value = null) {
    return await this._lock.schedule(() => { return this._value = value })
  }

  /**
   * Increment value then return.
   * @returns {number} number after increment
   */
  async incrementAndReturn() {
    return await this._lock.schedule(() => { return ++this._value })
  }

  /**
   * Return then increment value.
   * @returns {number} original number before increment
   */
  async returnAndIncrement() {
    return await this._lock.schedule(() => { return this._value++ })
  }

  /**
   * Decrement value then return.
   * @returns {number} number after decrement
   */
  async decrementAndReturn() {
    return await this._lock.schedule(() => { return --this._value })
  }

  /**
   * Return then decrement value.
   * @returns {number} original number before decrement
   */
  async returnAndDecrement() {
    return await this._lock.schedule(() => { return this._value-- })
  }
}

module.exports = AtomicReference
