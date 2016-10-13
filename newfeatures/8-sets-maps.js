
// TODO: add weaksets, maps and weakmaps

const coworkers = new Set()

coworkers.add('Melanie')
coworkers.add('Katja')
coworkers.add('Jörg')
coworkers.add('Jens')
coworkers.add('Arthur')
coworkers.add('Jörg')
coworkers.add('Max')

coworkers.delete('Jens')

// console.log(coworkers.keys())
// console.log(coworkers.values())

// sets are iterables!
for (c of coworkers) {
    console.log(c)
}

webheads = new Set(['Nicolas', 'Basti'])
webheads.has('Max') // false

const webheadNames = webheads.values()
console.log(webheadNames.next().value)
console.log(webheadNames.next().value)

webheads.add('Robert')
console.log(webheadNames.next().value) // 'Robert'

console.log(webheadNames.next().value) // undefined
