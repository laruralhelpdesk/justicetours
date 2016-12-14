'use strict';

const Nodal = require('nodal');

class Message extends Nodal.Model {}

Message.setDatabase(Nodal.require('db/main.js'));
Message.setSchema(Nodal.my.Schema.models.Message);

module.exports = Message;
