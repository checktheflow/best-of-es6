const logos = ["aliases-live-2016", "ambersea-live-2016", "anima-tempo-live-2016", "animals-as-leaders-live-2016", "born-of-osiris-live-2016", "carcer-city-live-2016", "clawerfield-live-2016", "dark-orbit-live-2016", "dead-letter-circus-live-2016-euroblast", "disperse-live-2016", "enslaved-live-2016", "exist-immortal-live-2016", "ghost-iris-live-2016-euroblast", "grim-van-doom-live-2016", "heart-of-a-coward-live-2016", "humanitys-last-breath-live-2016-euroblast", "intronaut-live-2016", "invivo-live-2016", "jin-jer-live-2016-euroblast", "masuria-live-2016", "port-noir-live-2016", "shining-live-2016", "skyharbor-live-2016-euroblast", "soon-live-2016", "strains-live-2016", "verderver-live-2016", "vola", "volumes-live-2016-euroblast"]

// create all of the hvo elements
document.querySelector('gutschein').innerHTML =
    logos
    .map(img => `<hvo><img src="/gutschein/img/${img}.jpg"></hvo>`)
    .join('')

// bind a function to the hvo elements which sets the img in the overlay and shows it
Array.from(document.querySelectorAll('hvo')).forEach(el =>
    el.addEventListener('click', event => {
        document.querySelector('overlay img').src = el.querySelector('img').src
        document.querySelector('overlay').style.display = 'block'
    })
)

// click away overlay
document.querySelector('overlay').addEventListener('click', function() {
    this.style.display = 'none'
})
