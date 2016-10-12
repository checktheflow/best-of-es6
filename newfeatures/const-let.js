// scoping of var vs let
(function () {
    for (var i = 0; i < 5; i++) {
        setTimeout(() => console.log(i), 1) // 5 5 5 5 5
    }

    for (let j = 0; j < 5; j++) {
        setTimeout(() => console.log(j), 1) // 0 1 2 3 4
    }

    console.log(`Value of i outside of the for loop is ${i}`) // 5
    console.log(`Value of j outside of the for loop is ${j}`) // ReferenceError: j is not defined

}())


/* let does not get hoisted */
(function () {
    console.log(someVar) // undefined
    var someVar = '👾'

    console.log(someLet) // ReferenceError: someLet is not defined
    let someLet = '👾'
}())


/* let does not get hoisted. Example with blocks */
(function () {
    console.log(anotherVar) // undefined
    if (true) {
        var anotherVar = '🎷'
    }
    console.log(anotherVar) // 🎷

    console.log(anotherLet) // ReferenceError: anotherLet is not defined
    if (true) {
        let anotherLet = '🎷'
    }
    console.log(anotherLet) // ReferenceError: anotherLet is not defined
}())


/* behaviour of const */
(function () {
    const user1 = {
        id: 1337,
        name: 'Melanie'
    }
    const user2 = {
        id: 666,
        name: 'Katj'
    }
    let user = user1

    user1.name = 'Katja' // changing a property is allowed

    // but reassigning or redeclaring is forbidden

    user1 = { id: 42, name: 'Basti' }
    // TypeError: Assignment to constant variable.
    // This is an error at runtime

    let user1 = { id: 42, name: 'Basti' }
    // SyntaxError: Identifier 'katja' has already been declared
    // This is an error at compile time

}())
