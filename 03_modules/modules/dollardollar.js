
const $ = selector =>
    document.querySelector.call(document, selector)

const $$ = selector =>
    Array.from(document.querySelectorAll(selector))

export { $, $$ }
