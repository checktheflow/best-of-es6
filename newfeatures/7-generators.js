function* germanCount() {
    yield 'eins'
    yield 'zwei'
    yield 'drei'
    yield 'vier'
    yield 'fünf'
}

const germanCounter = germanCount()

console.log(germanCounter.next()) // value: 'eins', done: false
console.log(germanCounter.next())
console.log(germanCounter.next())
console.log(germanCounter.next())
console.log(germanCounter.next()) // value: 'fünf', done: false
console.log(germanCounter.next()) // value: undefined, done: true




function* dutchCount() {
    i = 0
    while (++i <= 10) {
        yield `Ik heb tot ${i} geteld`
    }
}

const dutchCounter = dutchCount()

for (let c of dutchCounter) {
    console.log(c)
}






function* calcInterest(money, percentage, year) {
    while (true) {
        money = (money * (1 + percentage / 100)).toFixed(2)
        yield `In ${++year} you will have ${money}`
    }
}

const moneySequence = calcInterest(1337, 4, 2016)
console.log(moneySequence.next()) //
console.log(moneySequence.next()) //
console.log(moneySequence.next()) //








function* fibonacci() {
    let left = 0
    let right = 1
    while (true) {
        const current = left
        left = right
        right = current + left
        yield current
    }
}

const sequence = fibonacci();
console.log(sequence.next()) // 0
console.log(sequence.next()) // 1
console.log(sequence.next()) // 1
console.log(sequence.next()) // 2
console.log(sequence.next()) // 3
console.log(sequence.next()) // 5








function* socialmediaof(username) {
    yield fetch(`https://api.gravatar.com/avatar/${username}/200/200`)
    yield fetch(`https://api.github.com/profile/${username}/busiestday`)
    yield fetch(`https://api.twitter.com/profile/${username}/followers`)
    yield fetch(`https://api.facebook.com/profile/${username}/friends`)
    yield fetch(`https://api.facebook.com/profile/${username}`)
}

const melanie = socialmediaof('melanie')

const profile = {
    avatar: melanie.next(),
    dayWithMostCommits: melanie.next(),
    amountTwitterFollowers: melanie.next().length,
    amountFacebookFriends: melanie.next().length,
    city: melanie.next().city
}
