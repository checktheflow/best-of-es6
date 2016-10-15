
let [a, b] = ['alice', 'bob'];
console.log(a);
console.log(b);

[a, b] = [ b, a ];
console.log(a);
console.log(b);


let { job, name } = {
    name: 'Helge',
    age: 61,
    job: 'German comedian, jazz musician and multi-instrumentalist, author, film and theatre director, and actor'
}
console.log(`${name} is a ${job}.`)
