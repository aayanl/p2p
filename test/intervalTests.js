'use strict';

var assert = require('assertthat');

var interval = require('../lib/interval');

suite('interval', function () {
  test('is a function.', function (done) {
    assert.that(interval).is.ofType('function');
    done();
  });

  test('throws an error if options are missing.', function (done) {
    assert.that(function () {
      interval();
    }).is.throwing('Options are missing.');
    done();
  });

  test('throws an error if left is missing.', function (done) {
    assert.that(function () {
      interval({ right: 42, type: 'open' });
    }).is.throwing('Left is missing.');
    done();
  });

  test('throws an error if right is missing.', function (done) {
    assert.that(function () {
      interval({ left: 23, type: 'open' });
    }).is.throwing('Right is missing.');
    done();
  });

  test('throws an error if type is missing.', function (done) {
    assert.that(function () {
      interval({ left: 23, right: 42 });
    }).is.throwing('Type is missing.');
    done();
  });

  test('throws an error if an invalid type is given.', function (done) {
    assert.that(function () {
      interval({ left: 23, right: 42, type: 'rightopen' });
    }).is.throwing('Unknown interval type rightopen.');
    done();
  });

  test('returns an object.', function (done) {
    assert.that(interval({ left: 23, right: 42, type: 'open' })).is.ofType('object');
    done();
  });

  suite('contains', function () {
    test('is a function.', function (done) {
      assert.that(interval({ left: 23, right: 42, type: 'open' }).contains).is.ofType('function');
      done();
    });

    suite('open', function () {
      suite('non-circular', function () {
        test('returns false for a too small value.', function (done) {
          assert.that(interval({ left: 23, right: 42, type: 'open' }).contains(7)).is.false();
          done();
        });

        test('returns false for the left value.', function (done) {
          assert.that(interval({ left: 23, right: 42, type: 'open' }).contains(23)).is.false();
          done();
        });

        test('returns true for a contained value.', function (done) {
          assert.that(interval({ left: 23, right: 42, type: 'open' }).contains(37)).is.true();
          done();
        });

        test('returns false for the right value.', function (done) {
          assert.that(interval({ left: 23, right: 42, type: 'open' }).contains(42)).is.false();
          done();
        });

        test('returns false for a too large value.', function (done) {
          assert.that(interval({ left: 23, right: 42, type: 'open' }).contains(65)).is.false();
          done();
        });
      });

      suite('circular', function () {
        test('returns true for a small value.', function (done) {
          assert.that(interval({ left: 42, right: 23, type: 'open' }).contains(7)).is.true();
          done();
        });

        test('returns false for the right value.', function (done) {
          assert.that(interval({ left: 42, right: 23, type: 'open' }).contains(23)).is.false();
          done();
        });

        test('returns false for a non-contained value.', function (done) {
          assert.that(interval({ left: 42, right: 23, type: 'open' }).contains(37)).is.false();
          done();
        });

        test('returns false for the left value.', function (done) {
          assert.that(interval({ left: 42, right: 23, type: 'open' }).contains(42)).is.false();
          done();
        });

        test('returns true for a large value.', function (done) {
          assert.that(interval({ left: 42, right: 23, type: 'open' }).contains(65)).is.true();
          done();
        });
      });

      suite('with only one value in the interval', function () {
        test('returns false for the value itself.', function (done) {
          assert.that(interval({ left: 42, right: 42, type: 'open' }).contains(42)).is.false();
          done();
        });

        test('returns true for any other value.', function (done) {
          assert.that(interval({ left: 42, right: 42, type: 'open' }).contains(23)).is.true();
          done();
        });
      });
    });

    suite('leftopen', function () {
      suite('non-circular', function () {
        test('returns false for a too small value.', function (done) {
          assert.that(interval({ left: 23, right: 42, type: 'leftopen' }).contains(7)).is.false();
          done();
        });

        test('returns false for the left value.', function (done) {
          assert.that(interval({ left: 23, right: 42, type: 'leftopen' }).contains(23)).is.false();
          done();
        });

        test('returns true for a contained value.', function (done) {
          assert.that(interval({ left: 23, right: 42, type: 'leftopen' }).contains(37)).is.true();
          done();
        });

        test('returns true for the right value.', function (done) {
          assert.that(interval({ left: 23, right: 42, type: 'leftopen' }).contains(42)).is.true();
          done();
        });

        test('returns false for a too large value.', function (done) {
          assert.that(interval({ left: 23, right: 42, type: 'leftopen' }).contains(65)).is.false();
          done();
        });
      });

      suite('circular', function () {
        test('returns true for a small value.', function (done) {
          assert.that(interval({ left: 42, right: 23, type: 'leftopen' }).contains(7)).is.true();
          done();
        });

        test('returns true for the right value.', function (done) {
          assert.that(interval({ left: 42, right: 23, type: 'leftopen' }).contains(23)).is.true();
          done();
        });

        test('returns false for a non-contained value.', function (done) {
          assert.that(interval({ left: 42, right: 23, type: 'leftopen' }).contains(37)).is.false();
          done();
        });

        test('returns false for the left value.', function (done) {
          assert.that(interval({ left: 42, right: 23, type: 'leftopen' }).contains(42)).is.false();
          done();
        });

        test('returns true for a large value.', function (done) {
          assert.that(interval({ left: 42, right: 23, type: 'leftopen' }).contains(65)).is.true();
          done();
        });
      });

      suite('with only one value in the interval', function () {
        test('returns true for the value itself.', function (done) {
          assert.that(interval({ left: 42, right: 42, type: 'leftopen' }).contains(42)).is.true();
          done();
        });

        test('returns true for any other value.', function (done) {
          assert.that(interval({ left: 42, right: 42, type: 'leftopen' }).contains(23)).is.true();
          done();
        });
      });
    });
  });
});
