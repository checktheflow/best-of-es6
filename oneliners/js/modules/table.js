import { isStrongEnough, containsValue } from './filters'
import { dynamicSorter } from './sorters'


/*********
 * MODEL *
 *********/
const sortState = {
    key: 'pun',
    direction: 1
}


/****************
 * FOREIGN DATA *
 ****************/
let onelinersProxy

const init = proxy =>
    onelinersProxy = proxy


/********
 * VIEW *
 ********/

const render = (oneliners = [], sortState = { key: 'pun', direction: 1 }) => {
    document.getElementById('all-oneliners').tBodies[0].innerHTML =
        `${oneliners
        .sort(dynamicSorter(sortState.key, sortState.direction))
        .map(({ badass = '', strength = '', pun = '' }) =>
            `<tr>
                <td><quote>"${pun}"</quote></td>
                <td>${badass}</td>
                <td>${strength}/10</td>
            </tr>`)
        .join('')}`
}


/*********
 * PROXY *
 *********/

const proxy = new Proxy(sortState, {
    set(target, property, value, receiver) {

        if (!['key', 'direction'].includes(property)) {
            throw new Error(`🙈 You may only set the following attributes of the sortState object: [${['key', 'direction'].join(', ')}] `)
        }
        if (property === 'key' && (typeof value !== 'string' || !['pun', 'badass', 'strength'].includes(value))) {
            throw new Error(`🙈 key needs to be a string and one of the following options: [${['pun', 'badass', 'strength'].join(', ')}] `)
        }
        if (property === 'direction' && ![1, -1].includes(value)) {
            throw new Error('🙈 direction needs to either 1 or -1 ')
        }

        target[property] = value
        render(onelinersProxy.puns, target)

        return true
    }
})


/***************
 * USER EVENTS *
 ***************/

function reSort() {
    (proxy.key !== this.id)
        ? proxy.key = this.id
        : proxy.direction *= -1
}
document.getElementById('pun').addEventListener('click', reSort)
document.getElementById('badass').addEventListener('click', reSort)
document.getElementById('strength').addEventListener('click', reSort)


export const table = { init, render }
