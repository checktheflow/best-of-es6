
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
 * Compare puns of two oneliners by alphabet
 */
const punSorter = ({ pun: punL = '' }, { pun: punR = ''}) =>
    punL.toLowerCase() < punR.toLowerCase() ? -1 : 1

/**
 * Compare strength of two oneliners
 */
const strengthSorter = ({ strength: strengthL = 0 }, { strength: strengthR = 0 }) =>
    strengthL > strengthR ? -1 : 1


/*****************
 * Data handlers *
 *****************/

/**
 * Go through given list of puns,
 * validate them
 * and render them into the 'all-oneliners' node
 */
const injectFullListOfOneLiners = (allPuns = []) =>
    document.getElementById('all-oneliners').innerHTML =
        allPuns
        .sort(punSorter)
        .map(renderPunAsListItem)
        .join('')

/**
 * Go through given list of puns,
 * validate them,
 * filter them by a given strength,
 * sort them by strength
 * and render them into the 'damn-good-ones' node
 */
const injectDamnGoodOnesAsCards = (allPuns = []) =>
    document.getElementById('damn-good-ones').innerHTML =
        allPuns
        .filter(onelinerIsStrongEnough(8))
        .sort(strengthSorter)
        .map(renderOnelinerAsCard)
        .join('')


const injectTopTenAsTable = (allPuns = []) =>
    document.getElementById('top-ten').innerHTML =
        `<tbody>
        <tr><th>Pun</th><th>Badass</th><th>Strength</th></tr>
        ${allPuns
        .filter(onelinerIsValid)
        .sort(strengthSorter)
        .splice(0, 10)
        .map(renderOnelinerAsTableRow)
        .join('')}
        </tbody>`


/*********
 * STATE *
 *********/

// ⚠️ Do not modify this directly! Use the Proxy ;)
const oneliners = {
    puns: []
}

/**
 * pass updates through here, to automatically validate
 * and to also call the render functions above
 */
const onelinersProxy = new Proxy(oneliners, {
    set(target, name, value) {
        if (name !== 'puns') {
            throw new Error(`You may only set the puns attribute of the oneliners object 🙈`)
        }

        if (!(value instanceof Array)) {
            throw new Error('`puns` needs to be an array 🙈')
        }

        // console.log(value)

        if (!value.every(onelinerIsValid)) {
            throw new Error('One of the given one-liners is missing either a `badass`, `strength` or `pun` attribute 🙈')
        }

        injectFullListOfOneLiners(value)
        injectDamnGoodOnesAsCards(value)
        injectTopTenAsTable(value)
    }
})


/*********************
 * Application logic *
 *********************/

async function getAndInjectOneliners () {
    onelinersProxy.puns = await fetch('/oneliners/oneliners.json').then(d => d.json())
}

getAndInjectOneliners()
