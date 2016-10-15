
let [a, b] = ['alice', 'bob'];
console.log(a);
console.log(b);

[a, b] = [ b, a ];
console.log(a);
console.log(b);

















let [first, second, , , fifth] = $$('li')
console.log(second)




















let { job, name } = {
    name: 'Helge',
    age: 61,
    job: 'German comedian, jazz musician and multi-instrumentalist, author, film and theatre director, and actor'
}
console.log(`${name} is a ${job}.`)









let { top: liTop, left: liLeft } =
    document
    .querySelector('li')
    .getBoundingClientRect()

liTop // 520
liLeft // 60
