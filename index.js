const server = require('./server');
const router = require('./router');
const requestHandlers = require('./requestHandlers');

const handle = {
    '/': requestHandlers.start,
    '/start': requestHandlers.start,
    '/start/': requestHandlers.start,
    '/upload': requestHandlers.upload,
    '/upload/': requestHandlers.upload,
    '/upload-img': requestHandlers.uploadImage,
    '/upload-img/': requestHandlers.uploadImage,
    '/show': requestHandlers.show,
    '/show/': requestHandlers.show,
};

server.start(router.route, handle);