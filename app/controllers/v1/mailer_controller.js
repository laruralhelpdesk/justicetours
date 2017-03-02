'use strict';

const Nodal = require('nodal');
const mandrill = require('node-mandrill')(process.env.MANDRILL_API);
const emailTo = process.env.EMAIL_TO;
const emailFrom = process.env.EMAIL_FROM;
const User = Nodal.require('app/models/user.js');
const Message = Nodal.require('app/models/message.js');
const _ = require('underscore');

class V1MailerController extends Nodal.Controller {

  get() {

    this.respond({message: `GET request to ${this.constructor.name}`});

  }

  post() {
    console.log('Post In Mailer');
    const that = this;
    let html = '', subject= '', message = {};
    if (this.params.query.type === 'newChat') {
      User.find(this.params.route.id, (err, model) => {
        subject = `${model._data.first_name} Just Entered A Chat!`;

        // Format email message into string
        html = _.reduce(model._data, (prev, value, key) =>
          key === 'password' || key === 'id' ? prev : `${prev}<div>${key}: ${value}</div>`, '');

        message.message = {
          to: [{email: emailTo, name: 'Virtual Legal Help Desk'}],
          from_email: emailFrom,
          subject,
          html
        };

        mandrill('/messages/send', message, function(error, response){
          console.log('Mandrill Sending: ', message.message.html);
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

      });
    } else if (this.params.query.room_id) {
      subject = 'Chat Logs';

      Message.query()
        .where(this.params.query)
        .end((err, models) => {
          // Format chat logs into string
          html = _.reduce(models, (prev, curr) =>
            `${prev}<div>${curr._data.from_first_name} ${curr._data.from_last_name}: ${curr._data.body}</div>`, '');

          message.message = {
            to: [{email: emailTo, name: 'Virtual Legal Help Desk'}],
            from_email: emailFrom,
            subject: subject,
            html
          };

          mandrill('/messages/send', message, function(error, response){
            console.log('Mandrill Sending: ', message.message.html);
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

      });

    }

  }

  put() {

    this.badRequest();

  }

  del() {

    this.badRequest();

  }

}

module.exports = V1MailerController;
