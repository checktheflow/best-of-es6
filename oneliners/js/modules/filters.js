
/***********
 * Filters *
 ***********/

const isValid = ({ badass = '', strength = 0, pun = '' }) =>
    badass && strength && pun

const isStrongEnough = (neededStrength = 0) =>
    ({ strength = 0 }) =>
        strength >= neededStrength

const containsValue = (value = '') =>
    ({ pun: p, badass: b, strength: s }) =>
        [p, b, s].some(str =>
            str.toString().toLowerCase().includes(value.toLowerCase())
        )


export { isValid, isStrongEnough, containsValue }
