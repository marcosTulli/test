const Emitter = require('events').EventEmitter;
const util = require('util');

const events = {
  applicationReceived: 'application-received',
  validApplication: 'validated',
  invalidApplication: 'invalid',
  missionSelected: 'mission-selected',
  roleAvailable: 'role-available',
  roleCompatible: 'role-compatible',
};

const ReviewProcess = function (args) {
  let callback;

  this.processApplication = function (app, next) {
    this.emit(events.applicationReceived, app);
    callback = next;
  };

  this.validateApplication = function (app) {
    if (app.isValid()) {
      this.emit(events.validApplication, app);
    } else {
      this.emit(events.invalidApplication, app.validationMessage());
    }
  };

  this.findNextMission = function (app) {
    app.mission = {
      commander: null,
      pilot: null,
      MAVPilot: null,
      passengers: [],
    };
    this.emit(events.missionSelected, app);
  };

  this.roleIsAvailable = function (app) {
    this.emit(events.roleAvailable, app);
  };

  this.ensureRoleCompatible = function (app) {
    this.emit(events.roleCompatible, app);
  };

  this.acceptApplication = function (app) {
    if (callback) {
      callback(null, { success: true, message: 'Welcome to the Mars Program!' });
    }
  };
  this.denyApplication = function (message) {
    if (callback) {
      callback(null, { success: false, message: message });
    }
  };

  this.on(events.applicationReceived, this.validateApplication);
  this.on(events.validApplication, this.findNextMission);
  this.on(events.missionSelected, this.roleIsAvailable);
  this.on(events.roleAvailable, this.ensureRoleCompatible);
  this.on(events.roleCompatible, this.acceptApplication);
  this.on(events.invalidApplication, this.denyApplication);
};

util.inherits(ReviewProcess, Emitter);
module.exports = ReviewProcess;
