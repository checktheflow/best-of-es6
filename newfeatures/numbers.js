

// Brendan Eich showed this of in his NDC presentation 2014..
const mode = 0o755 // Unix 755 permission
const bits = 0b101 // 5
// so, yeah. This exists..




/**
 * global .isFinite() vs Number.isFinite()
 * global .isNaN() vs Number.isNaN()
 */

isFinite(42) // true
isFinite('42') // true 🙈
Number.isFinite('42') // false 👍

isNaN(42) // false
isNaN(1 * 'some string') // true
isNaN('heeeyo') // true 🙈
Number.isNaN('heeeyo') // false 👍




/* 40 years of Unix in Math.
   Here are some of the added functions */
Math.acosh
Math.asinh
Math.atanh
Math.cbrt
Math.clz32
Math.cosh
Math.expm1 // A normal minus 1 would hit boundaries..
Math.fround
Math.hypot
Math.log1p
Math.log10
Math.log2
Math.sign
Math.sinh
Math.tanh
Math.trunc
