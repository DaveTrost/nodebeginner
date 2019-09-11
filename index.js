const server = require('./server');
const router = require('./router');
const requestHandlers = require('./requestHandlers');

const handle = {
    '/': requestHandlers.start,
    '/start': requestHandlers.start,
    '/start/': requestHandlers.start,
    '/upload': requestHandlers.upload,
    '/upload/': requestHandlers.upload,
};

server.start(router.route, handle);