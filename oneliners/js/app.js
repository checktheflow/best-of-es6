
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



/*********
 * STATE *
 *********/

// ⚠️ Do not modify this directly! Use the Proxy ;)
const oneliners = {
    puns: []
}
const tableSort = {
    currentKey: 'pun',
    currentDirection: 1,
    allowedKeys: ['currentKey', 'currentDirection'],
    allowedTableHeads: ['pun', 'badass', 'strength']
}

/**
 * pass updates through here, to automatically validate
 * and to also call the render functions above
 */
const onelinersProxy = new Proxy(oneliners, {
    set(target, name, value) {
        if (name !== 'puns') {
            throw new Error('🙈 You may only set the puns attribute of the oneliners object')
        }
        if (!(value instanceof Array)) {
            throw new Error('🙈 `puns` needs to be an array')
        }
        if (!value.every(onelinerIsValid)) {
            throw new Error('🙈 One of the given one-liners is missing either a `badass`, `strength` or `pun` attribute')
        }

        target[name] = value

        injectTopTenAsList(Array.from(target.puns))
        injectDamnGoodOnesAsCards(Array.from(target.puns))
        injectAllAsTable(Array.from(target.puns), tableSort)
    }
})

const tableSortProxy = new Proxy(tableSort, {
    set(target, name, value) {
        if (!target.allowedKeys.includes(name)) {
            throw new Error(`🙈 You may only set the following attributes of the tableSort object: [${tableSort.allowedKeys.join(', ')}] `)
        }
        if (name === 'currentKey' && (typeof value !== 'string' || !target.allowedTableHeads.includes(value))) {
            throw new Error(`🙈 currentKey needs to be a string and one of the following options: [${target.allowedTableHeads.join(', ')}] `)
        }
        if (name === 'currentDirection' && ![1, -1].includes(value)) {
            throw new Error('🙈 currentDirection needs to either 1 or -1 ')
        }

        target[name] = value

        injectAllAsTable(Array.from(oneliners.puns), target)
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
 * @param {Object} tableSort The state of how to sort the table
 */
const injectAllAsTable = (puns = [], { currentKey:key = 'pun', currentDirection:direction = 1 } = {}) =>
    document.getElementById('all-oneliners').tBodies[0].innerHTML =
        `${puns
        .sort(sorter(key, direction))
        .map(renderOnelinerAsTableRow)
        .join('')}`


/**
 * Asynchronous function to fetch oneliners which returns a promise on which will be waited untill it is resolved
 */
async function getAndInjectOneliners () {
    onelinersProxy.puns = await fetch('/oneliners/oneliners.json').then(d => d.json())
}

// Ready, set, go!
getAndInjectOneliners()

/**
 * Either change direction if clicked the column header which is already sorted by
 * or if clicked on a different column header sort by that criteria instead.
 * @param {MouseEvent} event The mouse event
 */
function sortByClickedTableHeader(event) {
    if (tableSortProxy.currentKey === this.id) {
        tableSortProxy.currentDirection = tableSortProxy.currentDirection * -1
    } else {
        tableSortProxy.currentKey = this.id
    }
}

document.getElementById('pun').addEventListener('click', sortByClickedTableHeader)
document.getElementById('badass').addEventListener('click', sortByClickedTableHeader)
document.getElementById('strength').addEventListener('click', sortByClickedTableHeader)
