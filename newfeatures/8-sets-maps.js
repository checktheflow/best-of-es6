
// TODO: add weaksets, maps and weakmaps

const coworkers = new Set()

coworkers.add('Melanie')
coworkers.add('Katja')
coworkers.add('Jörg')
coworkers.add('Jens')
coworkers.add('Arthur')
coworkers.add('Jörg') // added twice, no problem 👍
coworkers.add('Max')

console.log(coworkers.values())

coworkers.has('Jens') // true
coworkers.delete('Jens')
coworkers.has('Jens') // false

// sets are iterables!
for (c of coworkers) {
    console.log(c)
}

// sets can also be made out of a given array
const webheads = new Set(['Nicolas', 'Basti'])
