'use strict';

const ImageStore = require('./app/utils/image-store');
const Hapi = require('@hapi/hapi');

const server = Hapi.server({
    port: 2000,
    host: 'localhost'
});

const dotenv = require('dotenv');
const credentials = {
    cloud_name: process.env.name,
    api_key: process.env.key,
    api_secret: process.env.secret
};

const result = dotenv.config();
if (result.error) {
    console.log(result.error.message);
    process.exit(1);
}

var handlebars = require('handlebars'),
    groupBy = require('handlebars-group-by');

groupBy.register(handlebars);



server.validator(require('@hapi/joi'))

require('./app/models/db');

async function init() {
    await server.register(require('@hapi/inert'));
    await server.register(require('@hapi/vision'));
    await server.register(require('@hapi/cookie'));

    server.auth.strategy('session', 'cookie', {
        cookie: {
            name: process.env.cookie_name,
            password: process.env.cookie_password,
            isSecure: false
        },
        redirectTo: '/'
    });

    server.auth.default('session');

    ImageStore.configure(credentials);

    server.views({
        engines: {
            hbs: require('handlebars')
        },
        relativeTo: __dirname,
        path: './app/views',
        layoutPath: './app/views/layouts',
        partialsPath: './app/views/partials',
        layout: true,
        isCached: false
    });

    server.route(require('./routes'));
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});

init();

