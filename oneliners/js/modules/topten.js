
import { strengthSorter } from './sorters'


/*******
* VIEW *
********/

const render = (puns = []) =>
    document.getElementById('top-ten').innerHTML =
        puns
        .sort(strengthSorter(-1))
        .slice(0, 10)
        .map(({ badass = '', strength = '', pun = '' }) =>
            `<li><quote>"${pun}"</quote> - ${badass} - ${strength}/10</li>`)
        .join('')


export const topTen = { render }
