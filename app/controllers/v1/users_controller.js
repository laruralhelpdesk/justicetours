'use strict';

const Nodal = require('nodal');
const User = Nodal.require('app/models/user.js');

const AuthController = Nodal.require('app/controllers/auth_controller.js')

class V1UsersController extends AuthController {

  index() {

    this.authorize((accessToken, user) => {
      console.log('before query');
      User.query()
        .where(this.params.query)
        .end((err, models) => {
          console.log('inside a query');
          this.respond(err || models);

        });
    })

  }

  show() {

    User.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {

    console.log('creating user');
    User.create(this.params.body, (err, model) => {
      console.error(err);
      this.respond(err || model);

    });

  }

  put() {

    this.authorize((accessToken, user) => {

      User.update(user._data.id, this.params.body, (err, model) => {


        this.respond(err || model);

      });
    });

  }

  destroy() {

    User.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = V1UsersController;
