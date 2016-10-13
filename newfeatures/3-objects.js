
/* destructuring */

let { top: liTop, left: liLeft } =
    document
    .querySelector('li')
    .getBoundingClientRect()

liTop // 520
liLeft // 60




/* shorthands */

let liPositionNotShorthand = {
    liTop: liTop,
    liLeft: liLeft
}

let liPosition = {
    liTop,
    liLeft
}
