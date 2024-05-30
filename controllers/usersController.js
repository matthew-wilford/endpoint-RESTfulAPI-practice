"use strict";

const httpStatus = require("http-status-codes");
const User = require("../models/users");

module.exports = {
  index: (req, res, next) => {
    User.find()
      .then((users) => {
        res.locals.users = users;
        console.log(`Inside User.find -usersController: ${res.locals.users}`);
        next();
      })
      .catch((error) => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },

  indexView: (req, res) => {
    console.log('usersController.indexView');
    if(req.query.format === 'json') {
        res.join(res.locals.users);
    } else {
      //res.render("users/index");
      res.send("This is really not needed");
    }
    
  },

  respondJSON:(req, res) => {
    console.log('userController.respondJSON');
    res.json({
        status: httpStatus.OK,
        data: res.locals
    })
  },

  errorJSON: (error, req, res, next) => {
    let errorObject;

    if(error) {
        errorObject = {
            status: 500,
            message: error.message
        };
    } else {
        errorObject = {
            status: 200,
            message: 'Unknown Error.'
        };
    }
    res.json(errorObject);
  },

  show: ( req, res, next ) => {
    let userId = req.params.id;
    User.findById( userId )
      .then( user => {
        res.locals.user = user;
        next();
      } )
      .catch( error => {
        console.log( `Error fetching user by ID: ${error.message}` );
        next( error );
      } );
  },

  showView: ( req, res ) => {
    res.render( 'users/show' );
  }
    
};