'use strict';

const Nodal = require('nodal');

class CreateMessages extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2016121402485803;
  }

  up() {

    return [
      this.createTable("messages", [{"name":"from_id","type":"int"},{"name":"from_first_name","type":"string"},{"name":"from_last_name","type":"string"},{"name":"body","type":"string"},{"name":"room_id","type":"int"}])
    ];

  }

  down() {

    return [
      this.dropTable("messages")
    ];

  }

}

module.exports = CreateMessages;
