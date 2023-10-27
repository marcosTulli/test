const assert = require('assert');
const MembershipApplication = require('../models/membership_application');

const dates = {
  today: '',
};

describe('Membership application requirements', () => {
  let validApp;
  before(function () {
    validApp = new MembershipApplication({
      first: 'Name',
      last: 'User',
      email: 'test@test.com',
      age: 30,
      height: 66,
      weight: 180,
    });
  });

  describe('Application valid if...', () => {
    it('all validators successful', () => {
      assert(validApp.isValid(), 'not valid');
    });
  });

  describe('Application Invalid if...', () => {
    const emptyApp = new MembershipApplication();
    it('Is Expired', () => {
      const app = new MembershipApplication({ validUntil: Date.parse('01/01/2022') });
      // const app = new MembershipApplication();
      assert(app.expired());
    });

    // Name
    it('First Name is more than 300`', () => {
      assert(!emptyApp.nameIsValid(), 'not valid');
    });
    it('Last Name is less than 100', () => {
      assert(!emptyApp.nameIsValid(), 'not valid');
    });

    // Email
    it('Email is 4 characters or less', () => {
      const app = new MembershipApplication({ email: 'dd@' });
      assert(!app.emailIsValid(), 'not valid');
    });
    it('Email does not contain @ symbol', () => {
      const app = new MembershipApplication({ email: 'dlkass.alslkd' });
      assert(!app.emailIsValid(), 'not valid');
    });
    it('Email is ommited', () => {
      assert(!emptyApp.emailIsValid(), 'not valid');
    });

    // Height
    it('Height is less than 60', () => {
      const app = new MembershipApplication({ height: 10 });
      assert(!app.heightIsValid(), 'not valid');
    });
    it('Height is more than 75', () => {
      const app = new MembershipApplication({ height: 80 });
      assert(!app.heightIsValid(), 'not valid');
    });
    it('Height is ommited', () => {
      assert(!emptyApp.heightIsValid(), 'not valid');
    });

    // Age
    it('Age is more than 100', () => {
      const app = new MembershipApplication({ age: 101 });
      assert(!app.ageIsValid(), 'not valid');
    });
    it('Age is less than 15', () => {
      const app = new MembershipApplication({ age: 14 });
      assert(!app.ageIsValid(), 'not valid');
    });
    it('Age is ommited', () => {
      assert(!emptyApp.ageIsValid(), 'not valid');
    });

    // Weight
    it('Weight is more than 300`', () => {
      const app = new MembershipApplication({ weight: 301 });
      assert(!app.weightIsValid(), 'not valid');
    });
    it('Weight is less than 100', () => {
      const app = new MembershipApplication({ weight: 90 });
      assert(!app.weightIsValid(), 'not valid');
    });
    it('Weight is ommited', () => {
      assert(!emptyApp.weightIsValid(), 'not valid');
    });
  });
});
