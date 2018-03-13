// has single "it.only"
const hasOnly = require('../../src').hasOnly
beforeEach(function () {
  const foundOnly = hasOnly(this.test)
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
  describe('s2', () => {
    it.only('e', () => {})
  })
})
