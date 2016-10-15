

/* Array.from() */

const $$ = selector =>
    Array.from(document.querySelectorAll(selector))

const $$strings = selector =>
    Array.from(
        // something arrayish
        document.querySelectorAll(selector),
        // custom map function
        element => element.innerHTML
    )
