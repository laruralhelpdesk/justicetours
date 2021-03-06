'use strict';

const Nodal = require('nodal');

class CreateUsers extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2016120601350690;
  }

  up() {

    return [
      this.createTable("users", [
        {"name":"email","type":"string"},
        {"name":"phone","type":"string"},
        {"name":"password","type":"string"},
        {"name":"username","type":"string"},
        {"name":"last_name","type":"string"},
        {"name":"first_name","type":"string"},
        {"name":"dob","type":"string"},
        {"name":"street","type":"string"},
        {"name":"city","type":"string"},
        {"name":"state","type":"string"},
        {"name":"zip","type":"string"},
        {"name":"income","type":"int"},
        {"name":"gender","type":"string"},
        {"name":"race","type":"string"},
        {"name":"veteran","type":"string"},
        {"name":"category","type":"string"},
        {"name":"householdSize","type":"int"}
      ])
    ];

  }

  down() {

    return [
      this.dropTable("users")
    ];

  }

}

module.exports = CreateUsers;
