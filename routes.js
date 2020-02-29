'use strict';

const Accounts = require('./app/controllers/accounts');
const Points = require('./app/controllers/points');
const Admins = require('./app/controllers/admins');
const Gallery = require('./app/controllers/gallery');

module.exports = [
    { method: 'GET', path: '/', config: Accounts.index },
    { method: 'GET', path: '/signup', config: Accounts.showSignup },
    { method: 'GET', path: '/login', config: Accounts.showLogin },
    { method: 'GET', path: '/logout', config: Accounts.logout },
    { method: 'POST', path: '/signup', config: Accounts.signup },
    { method: 'POST', path: '/login', config: Accounts.login },

    { method: 'GET', path: '/home', config: Points.home },
    { method: 'GET', path: '/view_add_POI', config: Points.view_add_POI },
    { method: 'GET', path: '/view_list_POI', config:Points.view_list_POI },
    { method: 'POST', path: '/add_POI', config: Points.add_POI },

    { method: 'GET', path: '/details/view_POI/{_id}', config: Points.view_POI },
    { method: 'GET', path: '/details/delete_POI/{_id}', config: Points.delete_POI },
    { method: 'GET', path: '/details/view_edit_POI/{_id}', config: Points.view_edit_POI },
    { method: 'POST', path: '/details/edit_POI/{_id}', config: Points.edit_POI },

    { method: 'GET', path: '/settings', config: Accounts.showSettings },
    { method: 'POST', path: '/settings', config: Accounts.updateSettings },

    { method: 'GET', path: '/admin', config: Admins.list_users },
    { method: 'GET', path: '/admin_edit_user/{_id}', config: Admins.show_user_details },
    { method: 'POST', path: '/admin_edit_user/{_id}', config: Admins.edit_user_details },
    { method: 'GET', path: '/admin_delete_user/{_id}', config: Admins.delete_user },

    { method: 'GET', path: '/details', config: Gallery.index },
    { method: 'POST', path: '/upload_image', config: Gallery.uploadFile },
    { method: 'GET', path: '/delete_image/{_id}', config: Gallery.deleteImage },

    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './public'
            }
        },
        options: { auth: false }
    }
];
