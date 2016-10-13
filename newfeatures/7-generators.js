
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
    yield 'een'
    yield 'twee'
    yield 'drie'
    yield 'vier'
    yield 'vijf'
    yield 'zes'
    yield 'zeven'
    yield 'acht'
    yield 'negen'
    yield 'tien'
}

const dutchCounter = dutchCount()

for (let c of dutchCounter) {
    console.log(c)
}






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
