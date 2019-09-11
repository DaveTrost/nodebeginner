const exec = require('child_process').exec;

function start(response) {
    console.log(`Request handler 'start' was called.`);

    exec('sleep 10 && ls -lah', (error, stdout, stderr) => {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write(stdout || 'empty');
        response.end();
    });
}

function upload(response) {
    console.log(`Request handler 'upload' was called.`);
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Hello Upload');
    response.end();
}

exports.start = start;
exports.upload = upload;
