/**
 * Arrow functions:
 * - bind the `this` of the scope it is in.
 * - can't be created instances out of via the `new` keyword.
 * - do not have the `arguments` object.
 * - never have names.
 */


// instead of this
function add2(a, b) {
    return a + b
}
// or this
const add3 = function (a, b) {
    return a + b
}

// we can now write this, which is just beautiful
// expression body
const add = (a, b) => a + b
// block body
const addBlock = (a, b) => {
    return a + b
}


// only one argument, can leave out the parentheses
const double = a => add(a, a)
const square = a => a * a
const stringify = a => a + ''


/* Now let's have some fun
   by going a little functional
   by composing some functions */

const compose = (fun, ...remainingFuns) =>
    remainingFuns.length
        ? (...args) => fun(compose(...remainingFuns)(...args))
        : fun

// just to compare - this is how it would look like without arrow functions:
const compose2 = function (fun, ...remainingFuns) {
    return remainingFuns.length
        ? function (...args) {
            return fun(compose(...remainingFuns)(...args))
        }
        : fun
}

// functions will be applied from right to left
console.log(compose(square, double)(1))
// 4

console.log(compose(stringify, Math.sqrt, square, double, add)(2, 3))
// "10"
