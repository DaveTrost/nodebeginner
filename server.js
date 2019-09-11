const http = require('http');
const url = require('url');

function start(route, handle) {
    function onRequest(request, response) {
        const pathname = url.parse(request.url).pathname;
        console.log(`Request for ${pathname} received.`);

        request.setEncoding('utf8');

        let postData = '';
        request.addListener('data', (postDataChunk) => {
            postData += postDataChunk;
            console.log(`received a POST data chunk.`);
        });

        request.addListener('end', () => {
            route(pathname, handle, response, postData);
        });

    }
    
    http.createServer(onRequest).listen(8888);
    console.log('server has started.');
}

exports.start = start;
