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

    // const fullPath = __dirname + request.url

    // console.log(fullPath)
    // let file = 'index.html'

    // if (request.url === '/') {
    //
    // }

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
            // response.write('./indeeex.html')
            response.end()
        })
        return
    }

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
            // response.write('./indeeex.html')
            response.end()
        })
        return
    }

    if (request.url === '/oneliners.css') {
        fs.readFile('./oneliners/oneliners.css', (error, html) => {
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

    if (request.url === '/oneliners.json') {
        response.write(JSON.stringify(require('./oneliners/server_files/oneliners.js')))
        request.pipe(response)
        response.end()
        return
    }

    console.log(`404: ${request.url}`)
    response.statusCode = 404
    response.write(`I don't know the given URL: ${request.url}`)
    response.end()

}).listen(8080)
