const http = require('http')
// const path = require('path')
const fs = require('fs')
const util = require('util')

console.log('http://localhost:8080 👾')


http.createServer(function(request, response) {

    request.on('error', function(err) {
        console.error(err)
        response.statusCode = 400
        response.end()
    })

    response.on('error', function(err) {
        console.error(err)
    })


    /**
     * GLOBAL
     */

    if (request.url === '/') {
        fs.readFile('./index.html', (error, html) => {
            if (error) {
                throw error
            }
            response.writeHeader(200, {
                'Content-Type': 'text/html',
                'Content-Length': html.length
            })
            response.write(html)
            response.end()
        })
        return
    }

    if (request.url === '/favicon.ico') {
        fs.readFile('./favicon.ico', (error, img) => {
            if (error) {
                throw error
            }
            response.writeHeader(200, {
                'Content-Type': 'image/x-icon',
                'Content-Length': img.length
            })
            response.write(img)
            response.end()
        })
        return
    }

    /**
     * ARROW FUNCTIONS AND EVENTS
     */
    if (request.url === '/events') {
        fs.readFile('./newfeatures/5-2-arrows-events.html', (error, html) => {
            if (error) {
                throw error
            }
            response.writeHeader(200, {
                'Content-Type': 'text/html',
                'Content-Length': html.length
            })
            response.write(html)
            response.end()
        })
        return
    }

    /**
     * ONELINERS
     **/

    if (request.url === '/oneliners') {
        fs.readFile('./oneliners/index.html', (error, html) => {
            if (error) {
                throw error
            }
            response.writeHeader(200, {
                'Content-Type': 'text/html',
                'Content-Length': html.length
            })
            response.write(html)
            response.end()
        })
        return
    }

    if (request.url === '/oneliners/style.css') {
        fs.readFile('./oneliners/style.css', (error, css) => {
            if (error) {
                throw error
            }
            response.writeHeader(200, {
                'Content-Type': 'text/css',
                'Content-Length': css.length
            })
            response.write(css)
            response.end()
        })
        return
    }

    if (request.url === '/oneliners/app.js') {
        fs.readFile('./oneliners/js/app.js', (error, js) => {
            if (error) {
                throw error
            }
            response.writeHeader(200, {
                'Content-Type': 'application/javascript',
                'Content-Length': js.length
            })
            response.write(js)
            response.end()
        })
        return
    }

    if (request.url === '/oneliners/oneliners.json') {
        fs.readFile('./oneliners/js/oneliners.json', (error, json) => {
            if (error) {
                throw error
            }
            response.writeHeader(200, {
                'Content-Type': 'text/json'
            })
            response.write(json)
            response.end()
        })
        return
    }


    /**
     * GUTSCHEIN
     */
    if (request.url === '/gutschein') {
        fs.readFile('./gutschein/index.html', (error, html) => {
            if (error) {
                throw error
            }
            response.writeHeader(200, {
                'Content-Type': 'text/html',
                'Content-Length': html.length
            })
            response.write(html)
            response.end()
        })
        return
    }

    if (request.url === '/gutschein/img/hvo.png') {
        fs.readFile(`.${request.url}`, (error, img) => {
            if (error) {
                throw error
            }
            response.writeHeader(200, {
                'Content-Type': 'image/png',
                'Content-Length': img.length
            })
            response.write(img)
            response.end()
        })
        return
    }

    if (request.url.includes('/gutschein/img/')) {
        fs.readFile(`.${request.url}`, (error, img) => {
            if (error) {
                throw error
            }
            response.writeHeader(200, {
                'Content-Type': `image/jpg`,
                'Content-Length': img.length
            })
            response.write(img)
            response.end()
        })
        return
    }

    if (request.url === '/gutschein/euroblastfont.woff') {
        fs.readFile('./gutschein/euroblastfont.woff', (error, woff) => {
            if (error) {
                throw error
            }
            response.writeHeader(200, {
                'Content-Type': 'application/octet-stream',
                'Content-Length': woff.length
            })
            response.write(woff)
            response.end()
        })
        return
    }

    if (request.url === '/gutschein/gutschein.js') {
        fs.readFile('./gutschein/gutschein.js', (error, js) => {
            if (error) {
                throw error
            }
            response.writeHeader(200, {
                'Content-Type': 'application/javascript',
                'Content-Length': js.length
            })
            response.write(js)
            response.end()
        })
        return
    }

    if (request.url === '/gutschein/gutschein.css') {
        fs.readFile('./gutschein/gutschein.css', (error, css) => {
            if (error) {
                throw error
            }
            response.writeHeader(200, {
                'Content-Type': 'text/css',
                'Content-Length': css.length
            })
            response.write(css)
            response.end()
        })
        return
    }

    /**
     * FLIPPING CARDS
     **/

    if (request.url === '/flipping_cards') {
        fs.readFile('./flipping_cards/index.html', (error, html) => {
            if (error) {
                throw error
            }
            response.writeHeader(200, {
                'Content-Type': 'text/html',
                'Content-Length': html.length
            })
            response.write(html)
            response.end()
        })
        return
    }

    if (request.url.includes('/img/')) {
        fs.readFile(`./flipping_cards${request.url}`, (error, img) => {
            if (error) {
                throw error
            }
            response.writeHeader(200, {
                'Content-Type': `image/jpg`,
                'Content-Length': img.length
            })
            response.write(img)
            response.end()
        })
        return
    }

    if (request.url === '/pretty.css') {
        fs.readFile('./flipping_cards/pretty.css', (error, css) => {
            if (error) {
                throw error
            }
            response.writeHeader(200, {
                'Content-Type': 'text/css',
                'Content-Length': css.length
            })
            response.write(css)
            response.end()
        })
        return
    }

    if (request.url === '/s24cardElement.js') {
        fs.readFile('./flipping_cards/s24cardElement.js', (error, js) => {
            if (error) {
                throw error
            }
            response.writeHeader(200, {
                'Content-Type': 'application/javascript',
                'Content-Length': js.length
            })
            response.write(js)
            response.end()
        })
        return
    }


    console.log(`404: ${request.url}`)
    response.statusCode = 404
    response.write(`I don't know the given URL: ${request.url}`)
    response.end()

}).listen(8080)
