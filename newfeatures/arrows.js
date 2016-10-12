/**
 * Arrow functions:
 * - bind the `this` of the scope it is in.
 * - can't be created instances out of via the `new` keyword.
 * - do not have the `arguments` object.
 * - never have names.
 */


// this is how very simple arrow functions could look like
const add = (a, b) => a + b

// a lot shorter and way more readable than this:
function add2(a, b) {
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

// functions will be applied from right to left
compose(square, double)(1)
// 4

console.log(compose(stringify, Math.sqrt, square, double, add)(2, 3))
// "10"
