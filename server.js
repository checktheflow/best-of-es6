const http = require('http')
// const path = require('path')
const fs = require('fs')

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
        fs.readFile('./oneliners/style.css', (error, html) => {
            if (error) {
                throw error
            }
            response.writeHeader(200, {
                'Content-Type': 'text/css',
                'Content-Length': html.length
            })
            response.write(html)
            response.end()
        })
        return
    }

    if (request.url === '/oneliners/app.js') {
        fs.readFile('./oneliners/js/app.js', (error, html) => {
            if (error) {
                throw error
            }
            response.writeHeader(200, {
                'Content-Type': 'application/javascript',
                'Content-Length': html.length
            })
            response.write(html)
            response.end()
        })
        return
    }

    if (request.url === '/oneliners/oneliners.json') {
        fs.readFile('./oneliners/js/oneliners.json', (error, html) => {
            if (error) {
                throw error
            }
            response.writeHeader(200, {
                'Content-Type': 'text/json',
                'Content-Length': html.length
            })
            response.write(html)
            response.end()
        })
        return
    }


    /**
     * FLIPPING CARDS
     **/

    




    console.log(`404: ${request.url}`)
    response.statusCode = 404
    response.write(`I don't know the given URL: ${request.url}`)
    response.end()

}).listen(8080)
