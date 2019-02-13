/** @module pover */

/**
 * @typedef valueGenerator
 * @type {function}
 * @param {string} value Original array entry
 * @param {number} index Index of the array entry (starts at 0)
 * @returns {*} Anything that will be the object entry value
 */

/**
 * Converts an array to an object with static keys and customizable values
 * @example
 * import pover from "pover"
 * pover(["a", "b"])
 * // {a: null, b: null}
 * @example
 * import pover from "pover"
 * pover(["a", "b"], "value")
 * // {a: "value", b: "value"}
 * @example
 * import pover from "pover"
 * pover(["a", "b"], (key, index) => `value for ${key} #${index + 1}`)
 * // {a: "value for a #1", b: "value for b #2"}
 * @function
 * @param {string[]} array Keys for the generated object
 * @param {valueGenerator|*} [valueGenerator=null] Optional function that sets the object values based on key and index
 * @returns {object<string, *>} A generated object based on the array input
 */
export default (array, valueGenerator = null) => {
  if (!Array.isArray(array)) {
    return {}
  }
  const object = {}
  if (typeof valueGenerator === "function") {
    let index = 0
    for (const value of array) {
      object[value] = valueGenerator(value, index)
      index++
    }
  } else {
    for (const value of array) {
      object[value] = valueGenerator
    }
  }
  return object
}