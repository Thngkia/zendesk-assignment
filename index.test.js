const functions = require('./index')

global.console = {
  log: jest.fn(),
  error: jest.fn(),
}

test('handleCarEntrance should log "Accept CarLot1"', () => {
  let carLotsObj = new Map()
  carLotsObj.set('CarLot1', null)
  let occupiedCarLots = 0
  let details = ['Enter', 'car', 'SGF9283P', '1613541902']
  functions.handleCarEntrance(occupiedCarLots, carLotsObj, details)
  expect(global.console.log).toHaveBeenCalledWith('Accept CarLot1')
})

test('handleExit should log CarLot3 6', () => {
  let carLotsObj = new Map()
  let motorcycleLotsObj = new Map()
  carLotsObj.set('CarLot3', { plate: 'SDW2111W', time: '1613549730' })
  let details = ['Exit', 'SDW2111W', '1613559745']
  functions.handleExit(carLotsObj, motorcycleLotsObj, details)
  expect(global.console.log).toHaveBeenCalledWith('CarLot3', 6)
})
