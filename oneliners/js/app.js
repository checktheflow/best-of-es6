
// TODO: use es6 modules
// import { filterOneLinerContainsValue2 } from './filters'

/*************************************
 *               STATE               *
 * ⚠️ Do not modify these directly ⚠️ *
 *        Use the Proxies ;)         *
 *************************************/

// This will keep the original full list
const oneliners = []
// This will be really changed via the proxy
const sortState = {
    key: 'pun',
    direction: 1
}
// This will be really changed via the proxy
const searchState = {
    value: ''
}


/*************
 * Renderers *
 *************/

/**
 * Render a given one-liner as a list item
 */
const renderPunAsListItem = ({ badass = '', strength = '', pun = '' }) =>
    `<li><quote>"${pun}"</quote> - ${badass} - ${strength}/10</li>`

/**
 * Render a given one-liner as a card
 */
const renderOnelinerAsCard = ({ badass = '', strength = '', pun = '' }) =>
    `<card>
        <quote>${pun}</quote>
        <badass>${badass}</badass>
        <strength>${strength}/10</strength>
    </card>`

/**
 * Render a given one-liner as a table row
 */
const renderOnelinerAsTableRow = ({ badass = '', strength = '', pun = '' }) =>
    `<tr>
        <td><quote>"${pun}"</quote></td>
        <td>${badass}</td>
        <td>${strength}/10</td>
    </tr>`


/***********
 * Filters *
 ***********/

/**
 * Check if all wanted attributes exist
 */
const onelinerIsValid = ({ badass = '', strength = 0, pun = '' }) =>
    badass && strength && pun

/**
 * Remember a given strength
 * and return a function which can be applied to an oneliner
 */
const onelinerIsStrongEnough = (neededStrength = 0) =>
    ({ strength = 0 }) =>
        strength >= neededStrength

/**
 * Remember given value
 * and return a function which can be applied to an oneliner
 */
const filterOneLinerContainsValue = (value = '') =>
    ({ pun: p, badass: b, strength: s }) =>
        [p, b, s].some(
            str =>
                str.toString().toLowerCase().includes(value.toLowerCase())
    )


/***********
 * Sorters *
 ***********/

/**
 * @param {Number} direction contains 1 or -1 for sorting ascending or descending
 */
const alphabeticSorter = (strLeft = '', strRight = '', direction = 1) =>
        (strLeft.toLowerCase() < strRight.toLowerCase() ? -1 : 1) * direction

/**
 * Compare puns of two oneliners by alphabet
 * @param {Number} direction contains 1 or -1 for sorting ascending or descending
 */
const punSorter = (direction = 1) =>
    ({ pun: strLeft = '' }, { pun: strRight = ''}) =>
        alphabeticSorter(strLeft, strRight, direction)

/**
 * Compare puns of two oneliners by alphabet
 * @param {Number} direction contains 1 or -1 for sorting ascending or descending
 */
const badassSorter = (direction = 1) =>
    ({ badass: strLeft = '' }, { badass: strRight = ''}) =>
        alphabeticSorter(strLeft, strRight, direction)

/**
 * Compare strength of two oneliners
 * @param {Number} direction contains 1 or -1 for sorting ascending or descending
 */
const strengthSorter = (direction = 1) =>
    ({ strength: strengthL = 0 }, { strength: strengthR = 0 }) =>
        (strengthL < strengthR ? -1 : 1) * direction

/**
 * Decide which sorter should actually be used
 */
const sorter = (key = '', direction = 1, caller = 'noname') =>
    (
           key === 'pun' && punSorter
        || key === 'badass' && badassSorter
        || key === 'strength' && strengthSorter
    )(direction)


/**
 * pass updates through here, to automatically validate
 * and to also call the render functions above
 */
const onelinersProxy = new Proxy(oneliners, {
    set(target, name, value) {
        if (name !== 'puns') {
            throw new Error('🙈 You may only set puns')
        }
        if (!(value instanceof Array)) {
            throw new Error('🙈 `puns` needs to be an array')
        }
        if (!value.every(onelinerIsValid)) {
            throw new Error('🙈 One of the given one-liners is missing either a `badass`, `strength` or `pun` attribute')
        }

        injectTopTenAsList(Array.from(value))
        injectDamnGoodOnesAsCards(Array.from(value))
        injectAllAsTable(Array.from(value), sortState)
    }
})

const tableSortProxy = new Proxy(sortState, {
    set(target, name, value) {
        const allowedKeys = ['key', 'direction']
        if (!allowedKeys.includes(name)) {
            throw new Error(`🙈 You may only set the following attributes of the sortState object: [${allowedKeys.join(', ')}] `)
        }
        const allowedTableHeads = ['pun', 'badass', 'strength']
        if (name === 'key' && (typeof value !== 'string' || !allowedTableHeads.includes(value))) {
            throw new Error(`🙈 key needs to be a string and one of the following options: [${allowedTableHeads.join(', ')}] `)
        }
        if (name === 'direction' && ![1, -1].includes(value)) {
            throw new Error('🙈 direction needs to either 1 or -1 ')
        }

        target[name] = value

        injectAllAsTable(
            Array.from(oneliners.puns.filter(filterOneLinerContainsValue(
                document.getElementById('search').value
            ))),
            target
        )
    }
})

const searchProxy = new Proxy(searchState, {
    set(target, name, value) {
        target.value = value
        onelinersProxy.puns = oneliners.puns.filter(filterOneLinerContainsValue(value))
    }
})


/*********************
 * Application logic *
 *********************/

/**
 * Go through given list of puns,
 * validate them
 * and render them into the 'all-oneliners' node
 */
const injectTopTenAsList = (puns = []) =>
    document.getElementById('top-ten').innerHTML =
        puns
        .sort(sorter('strength', -1, 'list'))
        .slice(0, 10)
        .map(renderPunAsListItem)
        .join('')

/**
 * Go through given list of puns,
 * validate them,
 * filter them by a given strength,
 * sort them by strength
 * and render them into the 'damn-good-ones' node
 */
const injectDamnGoodOnesAsCards = (puns = []) =>
    document.getElementById('all-good-ones').innerHTML =
        puns
        .filter(onelinerIsStrongEnough(9))
        .sort(sorter('strength', -1, 'cards'))
        .map(renderOnelinerAsCard)
        .join('')

/**
 * @param {Array} puns A list of pun objects
 * @param {Object} sortState The state of how to sort the table
 */
const injectAllAsTable = (puns = [], { key = 'pun', direction = 1 } = {}) =>
    document.getElementById('all-oneliners').tBodies[0].innerHTML =
        `${puns
        .sort(sorter(key, direction))
        .map(renderOnelinerAsTableRow)
        .join('')}`


/**
 * Add event for search box
 */
document.getElementById('search').addEventListener('input', function () {
    searchProxy.value = this.value
})

/**
 * Either change direction if clicked the column header which is already sorted by
 * or if clicked on a different column header sort by that criteria instead.
 */
function sortByClickedTableHeader() {
    if (tableSortProxy.key === this.id) {
        tableSortProxy.direction = tableSortProxy.direction * -1
    } else {
        tableSortProxy.key = this.id
    }
}
document.getElementById('pun').addEventListener('click', sortByClickedTableHeader)
document.getElementById('badass').addEventListener('click', sortByClickedTableHeader)
document.getElementById('strength').addEventListener('click', sortByClickedTableHeader)


/**
 * Asynchronous function to fetch oneliners which returns a promise on which will be waited untill it is resolved
 */
async function getAndInjectOneliners () {
    oneliners.puns = await fetch('/oneliners/oneliners.json').then(d => d.json())
    onelinersProxy.puns = oneliners.puns
}

// Ready, set, go!
getAndInjectOneliners()
