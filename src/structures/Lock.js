const asyncIntervals = []

const _runAsyncInterval = async (cb, interval, intervalIndex) => {
  await cb()
  if (asyncIntervals[intervalIndex]) setTimeout(() => _runAsyncInterval(cb, interval, intervalIndex), interval)
}

const setAsyncInterval = (cb, interval) => {
  if (cb && typeof cb === 'function') {
    const intervalIndex = asyncIntervals.length
    asyncIntervals.push(true)
    _runAsyncInterval(cb, interval, intervalIndex)
    return intervalIndex
  } else throw new TypeError('Callback must be a function.')
}

const clearAsyncInterval = (intervalIndex) => {
  if (asyncIntervals[intervalIndex]) asyncIntervals[intervalIndex] = false
}

class Lock {
  constructor() {
    this._lock = false
    this._interval = -1
    this.schedules = []
    this._promises = []
  }

  lock() {
    this._lock = true
  }

  unlock() {
    this._lock = false
  }

  schedule(func) {
    this.schedules.push(func)
    const promise = new Promise((resolve, reject) => {
      this._promises.push({resolve, reject})
    })
    if (this._interval !== -1) this.__runInterval()
    return promise
  }

  async __runInterval() {
    this._interval = setAsyncInterval(async () => {
      if (this.schedules.length <= 0) {
        this.__clearInterval()
        return
      }
      if (!this._lock) {
        this.lock()
        try { // eslint-disable-line no-restricted-syntax
          this._promises[0].resolve(await this.schedules[0]())
        } catch(e) {
          this._promises[0].reject(e)
        }
        this.schedules.shift()
        this._promises.shift()
        this.unlock()
      }
    }, 10)
  }

  __clearInterval() {
    clearAsyncInterval(this._interval)
    this._interval = -1
  }
}

module.exports = Lock
