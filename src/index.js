'use strict'

function findRoot (test) {
  if (!test) {
    return
  }

  while (test.parent) {
    test = test.parent
  }
  return test
}

function isUnemptyArray (a) {
  return Array.isArray(a) && a.length
}

/*
  Returns true if there are exclusive tests or suites. A test is exlusive
  if it has "it.only" modifier, same for suites.

  Typical scenario

    it('a', ...)
    describe('s', () => {
      it('b', ...)
      it.only('c', ...)
    })

  There are 2 suites: root and "s"
  The root suite has 1 test and 1 suite, but no "only" items
  The we traverse into "s" and find 1 "_onlyTests" and return true
*/
function _hasOnly (suite) {
  if (!suite) {
    return false
  }
  if (isUnemptyArray(suite._onlyTests)) {
    return true
  }

  if (isUnemptyArray(suite._onlySuites)) {
    return true
  }

  if (!Array.isArray(suite.suites)) {
    return false
  }

  return suite.suites.some(_hasOnly)
}

// works with both context and test
/*
beforeEach(function () {
  hasOnly(this.test) // true or false
  hasOnly(this) // same
})
*/
function hasOnly (test) {
  if (!test) {
    throw new Error('Missing current test')
  }
  // we can pass both current context or current est
  test = test.test ? test.test : test

  return _hasOnly(findRoot(test))
}

module.exports = { findRoot, hasOnly }
