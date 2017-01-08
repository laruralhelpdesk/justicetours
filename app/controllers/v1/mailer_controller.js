'use strict';

const Nodal = require('nodal');
const mandrill = require('node-mandrill')('TZYJUTXyRMwLJGqLSzbP-g');


class V1MailerController extends Nodal.Controller {

  get() {

    this.respond({message: `GET request to ${this.constructor.name}`});

  }

  post() {
    // TODO: configure this once on a proper domain
    var that = this;
    console.log(this.params, "this is params");
    console.log(this.params.query, "this is params.query");
    console.log('post in mailer hit');
    const message = {
      message: {
          to: [{email: 'ali@operationspark.org', name: 'Shams Ali'}],
          from_email: 'ali@operationspark.org',
          subject: "Hey, what's up?",
          text: "Hello, I sent this message using mandrill."
      }
    };

    mandrill('/messages/send', message, function(error, response){
        console.log('mandrill hit');
        //uh oh, there was an error
        if (error){
          error = JSON.stringify(error)
          console.log(error);
          that.respond({message: error})
        } else {
          console.log(response)
          that.respond({message: response});
        }
    });
    console.log('after mandrill');

  }

  put() {

    this.badRequest();

  }

  del() {

    this.badRequest();

  }

}

module.exports = V1MailerController;
