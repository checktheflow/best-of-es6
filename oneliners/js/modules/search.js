import { containsValue } from './filters'


/**
 * MODEL
 **/

// This will be really changed via the proxy
const searchState = {
    value: ''
}
let onelinersProxy
let allOneliners


/**
 * Proxy
 **/

const proxy = new Proxy(searchState, {
    set(target, property, value, receiver) {
        target.value = value
        onelinersProxy.puns = allOneliners.filter(containsValue(value))
        return true
    }
})



/**
 * Add event for search box
 */
document.getElementById('search').addEventListener('input', function () {
    proxy.value = this.value
})



const init = (proxy, all) => {
    onelinersProxy = proxy
    allOneliners = all
}


export const search = { init }
