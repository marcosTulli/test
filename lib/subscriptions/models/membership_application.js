const _ = require('underscore')._;
const moment = require('moment');

const MembershipApplication = function (args) {
  args || (args = {});
  _.extend(this, args);

  this.validUntil = args.validUntil ? moment(args.validUntil) : moment().add(10, 'days');

  this.expired = () => {
    return this.validUntil.isBefore(moment());
  };

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
  this.validationMessage = () => {
    if (this.isValid()) {
      return 'Application is valid';
    } else if (!this.emailIsValid()) {
      return 'Email is invalid';
    } else if (!this.ageIsValid()) {
      return 'Age is invalid';
    } else if (!this.heightIsValid()) {
      return 'Height is invalid';
    } else if (!this.weightIsValid()) {
      return 'Weight is invalid';
    } else if (!this.nameIsValid()) {
      return 'Name is invalid';
    } else if (!this.expired()) {
      return 'This appliaction is expired';
    }
  };
  this.isValid = function () {
    return (
      this.emailIsValid() &&
      this.heightIsValid() &&
      this.ageIsValid() &&
      this.weightIsValid() &&
      !this.expired()
    );
  };
};

module.exports = MembershipApplication;
