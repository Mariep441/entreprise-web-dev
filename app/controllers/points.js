
'use strict';

const Point = require('../models/point');
const User = require('../models/user');
const Image = require('../models/image');

const Points = {

    home: {
        handler: async function(request, h) {
            return h.view('home', { title: 'Home'});
        }
    },


    view_POI: {
        handler: async function(request, h) {
            const _id = request.params._id;
            const points = await Point.findById(_id).populate('contributor').lean();
            return h.view('details', {title: 'details', points: points});
        }
    },

    view_list_POI: {
        handler: async function(request, h) {
            const points = await Point.find().populate('contributor').lean();
            return h.view('view_list_POI', {title: 'All Points of Interest', points: points});
        }
    },

    view_add_POI: {
        handler: function(request, h) {
            return h.view('view_add_POI', { title: 'Add a Point of Interest' });
        }
    },

    add_POI: {
        handler: async function(request, h) {
          try {
              const id = request.auth.credentials.id;
              const user = await User.findById(id);
              const data = request.payload;

              const newPoint = new Point({
                  name: data.name,
                  description: data.description,
                  costalZone: data.costalZone,
                  coordinates: {
                      geo: {
                          lat: data.lat,
                          long: data.long,
                      }
                  },
                  contributor: user._id
              });
              await newPoint.save();
              return h.redirect('/view_list_POI');
          }  catch (err) {
              return h.view('home', {errors: [{message: err.message}]});
          }
        }
    },

    view_edit_POI: {
        handler: async function(request, h) {
            const _id = request.params._id;
            const points = await Point.findById(_id).populate('contributor').lean();
            return h.view('view_edit_POI', {title: 'Edit a Point of Interest', points: points });
        }
    },


    edit_POI: {
        handler: async function(request, h) {
            const userEdit = request.payload;
            const id = request.auth.credentials.id;
            const user = await User.findById(id);
            const _id = request.params._id;
            await Point.findByIdAndUpdate(
                {_id: _id },
                {name: userEdit.name,
                    description: userEdit.description,
                    costalZone: userEdit.costalZone,
                    coordinates: {
                        geo: {
                            lat: userEdit.lat,
                            long: userEdit.long}
                    },
                    image : userEdit.image,
                    contributor : user._id})
            return h.redirect('/view_list_POI');
        }
    },

    delete_POI: {
        handler: async function(request, h) {
            const _id = request.params._id;
            await Point.remove_POI(_id).lean();
            return h.redirect('/view_list_POI');
        }
    },

};

module.exports = Points;

