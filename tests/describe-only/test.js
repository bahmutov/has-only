// has single "describe.only"
const hasOnly = require('../../src').hasOnly
beforeEach(function () {
  const foundOnly = hasOnly(this)
  if (foundOnly) {
    console.log('found only')
    process.exit(1)
  } else {
    console.log('did not find .only')
    process.exit(0)
  }
})

it('a', () => {})
it('b', () => {})
it('c', () => {})
describe('s', () => {
  it('d', () => {})
  describe.only('s2', () => {
    it('e', () => {})
  })
})
