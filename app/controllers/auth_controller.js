'use strict';

const Nodal = require('nodal');

const AccessToken = Nodal.require('app/models/access_token.js');

class AuthController extends Nodal.Controller {

  authorize(callback) {

    this.setHeader('Cache-Control', 'no-store');
    this.setHeader('Pragma', 'no-cache');

    AccessToken.verify(this.params, (err, accessToken, user) => {
      if (err) {
        console.log('inside error')
        return this.respond(err);
      }
      console.log('before callback')
      callback(accessToken, user);
    });

    // callback(null);

  }

}

module.exports = AuthController;
