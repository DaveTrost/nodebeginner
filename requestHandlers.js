const querystring = require('querystring');
const fs = require('fs');

function start(response) {
    console.log(`Request handler 'start' was called.`);

    const body = /*html*/ `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
        </head>
        <body>
            <form action="/upload" method="post">
                <textarea name="text" cols="60" rows="20"></textarea>
                <input type="submit" value="Submit text">
            </form>
        </body>
        </html>
    `;

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(body);
    response.end();

}

function upload(response, postData) {
    console.log(`Request handler 'upload' was called.`);
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write(`You've submitted: '${querystring.parse(postData).text}'.`);
    response.end();
}

function show(response) {
    console.log(`Request handler 'show' was called.`);
    response.writeHead(200, { 'Content-Type': 'image/png' });
    fs.createReadStream('/Users/davet/alchemy/career-track/nodebeginner/tmp/image.png').pipe(response);
    // response.end();
}

exports.start = start;
exports.upload = upload;
exports.show = show;
