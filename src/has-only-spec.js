'use strict'

const la = require('lazy-ass')
const execaWrap = require('execa-wrap')
const join = require('path').join

/* eslint-env mocha */
describe('finds root', () => {
  const { findRoot } = require('.')

  it('finds the root of these tests', function () {
    const root = findRoot(this.test)
    la(root, 'could not find root')
    la(root.root, 'does not have root: true set', root)
  })
})

describe('has-only', () => {
  const mocha = join(__dirname, '..', 'node_modules', '.bin', 'mocha')

  it('does not find any', () => {
    const spec = join(__dirname, '..', 'tests', 'no-only', 'test.js')
    return execaWrap(mocha, [spec]).then(output => {
      la(output.includes('code: 0'), output)
    })
  })
})
