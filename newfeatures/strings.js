/**
 * Strrrrrrings
 **/

const heeeyo = 'All the devs in da house say "HEEEYO"!'




/* String.prototype.includes */

heeeyo.includes('devs') // true
heeeyo.includes('cats') // false

/* But why not .contains() instead?
 * - Because, it would have broken mootools.
 * Thou shall not break the web! */




/* String.prototype.startsWith
   String.prototype.endsWith */

heeeyo.startsWith('All') // true
heeeyo.startsWith('Some') // false
heeeyo.startsWith('devs', 8) // true

heeeyo.endsWith('!') // true
heeeyo.endsWith('devs', 12) // true




/* String.prototype.repeat */

'yada '.repeat(3) // "yada yada yada "




/* String.prototype.trim */

'yada '.repeat(3).trim(2) // "yada yada yada"




/**
 * Template Strings 🎉
 **/

// multiline with \n
console.log(`bla , \n asdf`)

// multiline by just creating an actual new line
console.log(`bla ,
 asdf`)


/* interpolation */

const who = 'devs'
const what = 'heeeyo'

console.log(`All the ${who} in da house say "${what}"!`)


/* interpolation with tags */

const html2text = (strings, ...values) =>
    strings
    .map(
        (string, i) =>
            string + (values[i] || '').replace(/(<([^>]+)>)/g, '')
    )
    .join('')

const userInput = 'Hi, let me hack you </div><script>evilCode()</script>'

console.log(html2text `<h1>User input</h1><div>${userInput}</div>`)
