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

describe.skip('has-failed', () => {
  // testing how we can detect failing test or hook
  const { hasFailed } = require('.')
  after(function () {
    const failed = hasFailed(this.test)
    console.log('has failed?', failed)
  })

  beforeEach(() => {
    // throw new Error('failing beforeEach')
  })

  afterEach(() => {
    // throw new Error('failing afterEach')
  })

  it('dummy passing test', () => {})

  it('dummy failing test', () => {
    throw new Error('nope')
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

  it('finds single it.only', () => {
    const spec = join(__dirname, '..', 'tests', 'it-only', 'test.js')
    return execaWrap(mocha, [spec]).then(output => {
      la(output.includes('code: 1'), output)
    })
  })

  it('finds describe.only', () => {
    const spec = join(__dirname, '..', 'tests', 'describe-only', 'test.js')
    return execaWrap(mocha, [spec]).then(output => {
      la(output.includes('code: 1'), output)
    })
  })
})
