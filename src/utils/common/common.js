import dayjs from 'dayjs'

/**
 * @desc  Formattimerange
 * @param {(Object|string|number)} time
 * @param {string} format
 * @returns {string | null}
 */
export function formatDateTime(time = undefined, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(time).format(format)
}

export function formatDate(date = undefined, format = 'YYYY-MM-DD') {
  return formatDateTime(date, format)
}

/**
 * @desc  functionthrottle
 * @param {Function} fn
 * @param {Number} wait
 * @returns {Function}
 */
export function throttle(fn, wait) {
  var context, args
  var previous = 0

  return function () {
    var now = +new Date()
    context = this
    args = arguments
    if (now - previous > wait) {
      fn.apply(context, args)
      previous = now
    }
  }
}

/**
 * @desc  functiondebounce
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(method, wait, immediate) {
  let timeout
  return function (...args) {
    let context = this
    if (timeout) {
      clearTimeout(timeout)
    }
    // immediatelyExecuteneedneed twoaitemscondition，oneYesimmediatefortrue，twoYestimeoutnotbeassignorbesetfornull
    if (immediate) {
      /**
       * if definedtimedevicenotexists，thenimmediatelyExecute，andsetoneadefinetimedevice，waitMillisecondafterwilldefinetimedevicesetfornull
       * this ensuresimmediatelyExecuteafterwaitMillisecondwithinwon'ttriggered again
       */
      let callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) {
        method.apply(context, args)
      }
    } else {
      // ifimmediateforfalse，thenfunctionwaitMillisecondafterExecute
      timeout = setTimeout(() => {
        /**
         * argsYesan array-like object，sousefn.apply
         * alsocanwritingmethod.call(context, ...args)
         */
        method.apply(context, args)
      }, wait)
    }
  }
}
