

const threeToSix = [3, 4, 5, 6]
const merged = [1, 2, ...threeToSix, 7, 8]














const createHTMLList = (...list) =>
    `<ol>${list.map(item => `<li>${item}</li>`).join('')}</ol>`


console.log(createHTMLList(1, 2, 3, 4))

const list = [5, 6, 7, 8]
console.log(createHTMLList(...list))
