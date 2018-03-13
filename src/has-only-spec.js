'use strict'

const la = require('lazy-ass')

/* eslint-env mocha */
describe('finds root', () => {
  const { findRoot } = require('.')

  it('finds the root of these tests', function () {
    const root = findRoot(this.test)
    la(root, 'could not find root')
    la(root.root, 'does not have root: true set', root)
  })
})
