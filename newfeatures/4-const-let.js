
/***********
 * scoping *
 ***********/
(function () {

    for (var i = 0; i < 5; i++) {
        setTimeout(() => console.log(i), 1)
        // 🐞 5 5 5 5 5
    }

    for (let j = 0; j < 5; j++) {
        setTimeout(() => console.log(j), 1)
        // 👍 0 1 2 3 4
    }

    console.log(`Value of i outside of the for loop is ${i}`)
    // 🐞 Value of i outside of the for loop is 5

    console.log(`Value of j outside of the for loop is ${j}`)
    // 👍 ReferenceError: j is not defined

}())





/************
 * hoisting *
 ************/
(function () {

    console.log(dog)
    // undefined

    var dog = '🐶'


    console.log(cat)
    // ReferenceError: cat is not defined

    let cat = '😻'

}())




/*********
 * const *
 *********/

const user1 = { name: 'Melanie', icon: '🦄' }
const user2 = { name: 'Ktja', icon: '🤘' }

// We can fix the typo,
// because changig a property is allowed
user2.name = 'Katja'

// but reassigning is forbidden
user1 = { name: 'Basti', icon: '💪' }
// TypeError: Assignment to constant variable.
// This is an error at runtime

// and redeclaring is also forbidden
let user1 = { name: 'Basti', icon: '💪' }
// SyntaxError: Identifier 'katja' has already been declared
// This is an error at compile time
