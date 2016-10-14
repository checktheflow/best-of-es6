import { isValid, isStrongEnough } from './filters'
import { topTen } from './topten'
import { cards } from './cards'
import { table } from './table'
import { search } from './search'


/*********
 * MODEL *
 *********/

let allOneliners = []



/*********
 * PROXY *
 *********/

const proxy = new Proxy(allOneliners, {
    set(target, property, value, receiver) {
        if (property !== 'puns') {
            throw new Error('🙈 You may only set puns')
        }
        if (!(value instanceof Array)) {
            throw new Error('🙈 `puns` needs to be an array')
        }
        if (!value.every(isValid)) {
            throw new Error('🙈 One of the given one-liners is missing either a `badass`, `strength` or `pun` attribute')
        }

        target[property] = value

        const copy = Array.from(value)

        topTen.render(copy)
        cards.render(copy)
        table.render(copy)

        return true
    }
})


async function init() {
    allOneliners = await fetch('/oneliners/oneliners.json').then(d => d.json())
    proxy.puns = allOneliners
    table.init(proxy)
    search.init(proxy, allOneliners)
}


export { init }
