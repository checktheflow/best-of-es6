
/***********
 * Sorters *
 ***********/

const punSorter = direction =>
    ({ pun: l }, { pun: r }) =>
        (l.toLowerCase() < r.toLowerCase() ? -1 : 1) * direction

const badassSorter = direction =>
    ({ badass: l }, { badass: r }) =>
        (l.toLowerCase() < r.toLowerCase() ? -1 : 1) * direction

const strengthSorter = (direction = 1) =>
    ({ strength: l = 0 }, { strength: r = 0 }) =>
        (l < r ? -1 : 1) * direction

const dynamicSorter = (key = '', direction = 1) =>
    (
           key === 'pun' && punSorter
        || key === 'badass' && badassSorter
        || key === 'strength' && strengthSorter
    )(direction)


export { punSorter, badassSorter, strengthSorter, dynamicSorter }
