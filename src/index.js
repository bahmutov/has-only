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
function hasOnly (root) {
  if (!root) {
    return false
  }
  if (isUnemptyArray(root._onlyTests)) {
    return true
  }

  if (isUnemptyArray(root._onlySuites)) {
    return true
  }

  return root.suites.some(hasOnly)
}

module.exports = { findRoot, hasOnly }
