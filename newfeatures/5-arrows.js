/**
 * Arrow functions:
 * - bind the `this` of the scope it is in.
 * - can't be created instances out of via the `new` keyword.
 * - do not have the `arguments` object.
 * - never have names.
 */






// named function
function add1(a, b) {
    return a + b
}

// anonymous function
const add2 = function (a, b) {
    return a + b
}

// arrow function (block body)
const add3 = (a, b) => {
    return a + b
}

// arrow function (expression body)
const add4 = (a, b) => a + b











let amountMoneySaved =
    products
    .map(function (p) {
        return p.price
    })
    .reduce(function (a, b) {
        return a + b
    }, 0)
    -
    products
    .filter(function (p) {
        return p.price !== p.originalPrice
    })
    .map(function (p) {
        return p.price
    })
    .reduce(function (a, b) {
        return a + b
    }, 0)







let amountMoneySaved =
    products
    .map(p => p.price)
    .reduce((a, b) => a + b, 0)
    -
    products
    .filter(p => p.price !== p.originalPrice)
    .map(p => p.price)
    .reduce((a, b) => a + b, 0)















const add = (a, b) => a + b
const double = a => add(a, a)
const square = a => a * a
const stringify = a => a + ''

const compose = (fun, ...remainingFuns) =>
    remainingFuns.length
        ? (...args) => fun(compose(...remainingFuns)(...args))
        : fun

console.log(compose(square, double)(1))
// 4

console.log(compose(stringify, Math.sqrt, square, double, add)(2, 3))
// "10"
