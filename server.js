const http = require('http');
const url = require('url');

function start(route, handle) {
    function onRequest(request, response) {
        const pathname = url.parse(request.url).pathname;
        console.log(`Request for ${pathname} received.`);
        route(pathname, handle, response, request);
    }
    
    http.createServer(onRequest).listen(3000);
    console.log('server has started.');
}

exports.start = start;
