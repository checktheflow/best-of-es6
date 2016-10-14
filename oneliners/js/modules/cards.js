import { isStrongEnough } from './filters'
import { strengthSorter } from './sorters'


/*********
 * VIEWS *
 *********/

const render = (puns = []) =>
    document.getElementById('all-good-ones').innerHTML =
        puns
        .filter(isStrongEnough(9))
        .sort(strengthSorter(-1))
        .map(({ badass = '', strength = '', pun = '' }) =>
            `<card>
                <quote>${pun}</quote>
                <badass>${badass}</badass>
                <strength>${strength}/10</strength>
            </card>`)
        .join('')


export const cards = { render }
