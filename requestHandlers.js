const querystring = require('querystring');
const fs = require('fs');
const formidable = require('formidable');

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
            <form action="/upload-img" enctype="multipart/form-data" method="post">
                <input type="file" name="upload" muliple="multiple">
                <input type="submit" value="Upload File">
            </form>
        </body>
        </html>
    `;

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(body);
    response.end();

}

function upload(response, request) {
    console.log(`Request handler 'upload' was called.`);

    request.setEncoding('utf8');

    let postData = '';
    request.addListener('data', (postDataChunk) => {
        postData += postDataChunk;
        console.log(`received a POST data chunk.`);
    });

    request.addListener('end', () => {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write(`You've submitted: '${querystring.parse(postData).text}'.`);
        response.end();
    });
}

function uploadImage(response, request) {
    console.log(`Request handler 'uploadImage' was called.`);

    const form = new formidable.IncomingForm();
    form.parse(request, (error, fields, files) => {
        console.log(`parsing done ... ${files.upload}`);

        fs.rename(files.upload.path, '/Users/davet/alchemy/career-track/nodebeginner/tmp/image.png', (error) => {
            if(error) {
                fs.unlink('/Users/davet/alchemy/career-track/nodebeginner/tmp/image.png');
                fs.rename(files.upload.path, '/Users/davet/alchemy/career-track/nodebeginner/tmp/image.png');
            }
        });

    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(`Received Image:<br>`);
    response.write(`<img src="/show" width="400px"/>`);
    response.end();
}

function show(response) {
    console.log(`Request handler 'show' was called.`);
    response.writeHead(200, { 'Content-Type': 'image/png' });
    fs.createReadStream('/Users/davet/alchemy/career-track/nodebeginner/tmp/image.png').pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.uploadImage = uploadImage;
exports.show = show;
