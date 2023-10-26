const assert = require('assert');
const MemberShipApplication = require('../models/membership_application');

describe('Membership application requirements', () => {
  let validApp;
  before(function () {
    validApp = new MemberShipApplication({
      first: 'Name',
      last: 'User',
      email: 'test@test.com',
      age: 30,
      height: 66,
      weight: 180,
    });
  });

  describe('Application valid if...', () => {
    it('All Validators successful', () => {
      assert(validApp.isValid(), 'Not Valid');
    });
    it('Email is 4 or more chars and contains an @.', () => {
      assert(validApp.emailIsValid(), 'Email not valid');
    });
    it('Height is between 60 and 75 inches.', () => {
      assert(validApp.heightIsValid(), 'Height  not valid');
    });
    it('Age is between 15 and 100 years.', () => {
      assert(validApp.ageIsValid(), 'Age not valid');
    });
    it('Weight is between 100 and 300 pounds.', () => {
      assert(validApp.weightIsValid(), 'Weight not valid');
    });
    it('First and Last name are provided.', () => {
      assert(validApp.nameIsValid(), 'Name not valid');
    });
  });
});
