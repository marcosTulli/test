const assert = require('assert');
const ReviewProcess = require('../processes/review');
const MembershipApplication = require('../models/membership_application');
const sinon = require('sinon');

describe('The Review Process', function () {
  this.timeout(2000);

  const validAppData = {
    first: 'Name',
    last: 'User',
    email: 'test@test.com',
    age: 30,
    height: 66,
    weight: 180,
  };

  let review, validApp, spy;

  beforeEach(function () {
    review = new ReviewProcess();
    validApp = new MembershipApplication(validAppData);
    spy = sinon.spy(validApp, 'emailIsValid');
  });

  it('Receiving a valid Application returns success', function (done) {
    setTimeout(done, 0);
    review.processApplication(validApp, function (err, result) {
      assert(result.success, result.message);
      done();
    });
  });

  it('Validates Email', function (done) {
    setTimeout(done, 0);
    review.processApplication(validApp, function () {
      assert(spy.called);
      done();
    });
  });
});
