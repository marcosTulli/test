const _ = require('underscore')._;

const MemberShipApplication = function (args) {
  _.extend(this, args);
  this.nameIsValid = () => {
    return this.first && this.last && this.first.length > 3 && this.last.length > 3;
  };
  this.emailIsValid = () => {
    return this.email && this.email.length > 3 && this.email.indexOf('@') > -1;
  };
  this.heightIsValid = () => {
    return this.height && this.height > 60 && this.height < 70;
  };
  this.ageIsValid = () => {
    return this.age && this.age < 100 && this.age > 15;
  };
  this.weightIsValid = () => {
    return this.weight && this.weight > 100 && this.weight < 300;
  };
  this.isValid = function () {
    return this.emailIsValid() && this.heightIsValid() && this.ageIsValid() && this.weightIsValid();
  };
};

module.exports = MemberShipApplication;
