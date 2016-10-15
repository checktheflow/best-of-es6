
/**
 * Template Strings 🎉
 **/

console.log(`hello`)
console.log(`line 1,
    line 2`)


/* interpolation */
const who = 'devs'
const what = 'heeeyo'
console.log(`All the ${who} in da house say "${what}"!`)


/* interpolation with tags */

const html2text = (strings, ...values) => strings.map((string, i) => string + (values[i] || '').replace(/(<([^>]+)>)/g, '')).join('')

const userInput = 'Hi, let me hack you </div><script>evilCode()</script>'

const dangerous = `<h1>User input</h1><div>${userInput}</div>`
const save = html2text `<h1>User input</h1><div>${userInput}</div>`

console.log(dangerous)
console.log(save)
