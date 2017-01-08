'use strict';

const Nodal = require('nodal');
const mandrill = require('node-mandrill')(process.env.MANDRILL_API);
const User = Nodal.require('app/models/user.js');

class V1MailerController extends Nodal.Controller {

  get() {

    this.respond({message: `GET request to ${this.constructor.name}`});

  }

  post() {
    // TODO: confirm if works once on a proper domain
    const that = this;
    let text = '', subject= '', message = {};
    console.log('post in mailer hit');
    User.find(this.params.route.id, (err, model) => {
      if (this.params.query.type === 'newChat') {
        text = JSON.stringify(model._data);
        subject = `${model._data.first_name} Just Entered A Chat!`;
      }
      // TODO: change email and name
      message.message = {
        to: [{email: 'ali@operationspark.org', name: 'Shams Ali'}],
        from_email: model._data.email,
        subject: subject,
        text: text
      };

      mandrill('/messages/send', message, function(error, response){
        console.log('mandrill hit');
        if (error){
          error = JSON.stringify(error)
          console.log(error);
          that.respond({message: error})
        } else if (response[0].status === "rejected"){
          console.log(response)
          that.respond({error: response});
        } else {
          that.respond({message: response});
        }
      });
      console.log('after mandrill');

    });


  }

  put() {

    this.badRequest();

  }

  del() {

    this.badRequest();

  }

}

module.exports = V1MailerController;
