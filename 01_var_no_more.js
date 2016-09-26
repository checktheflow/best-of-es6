// scoping of var vs let
(function () {
    for (var i = 0; i < 5; i++) {
        console.log(`var: iteration ${i}`)
        setTimeout(() => console.log(`var: setTimeout ${i}`), 1)
    }
    console.log(i)

    for (let j = 0; j < 5; j++) {
        console.log(`let: iteration ${j}`)
        setTimeout(() => console.log(`let: setTimeout ${j}`), 1)
    }
    console.log(j)

}())


// hoisting
(function () {
    console.log(someVar)
    var someVar = '👾'

    console.log(someLet)
    let someLet = '👾'

    if (true) {
        var anotherVar
    }
    console.log(anotherVar)

    if (true) {
        let anotherLet
    }
    console.log(anotherLet)
}())


// const
(function () {
    const melanie = {
        id: 123456789,
        name: 'Melanie'
    }
    const katja = {
        id: 123456789,
        name: 'Katja'
    }
    let user = melanie

    katja = melanie // TypeError (error at runtime)
    let katja = melanie // SyntaxError (error at compile time)
}())
