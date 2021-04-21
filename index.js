const fs = require('fs')
// convert argument into filepath
let filePath = __dirname + `/${process.argv[2]}`

// read file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  carpark(data)
})

// process file information
let carpark = (data) => {
  let arr = data.split('\n')
  let lots = arr[0].split(' ')
  let carLots = lots[0]
  let motorcycleLots = lots[1]

  // initialise carpark objects
  let carLotsObj = new Map()
  for (let i = 1; i <= carLots; i++) {
    let str = 'carLot' + i
    carLotsObj.set(str, null)
  }
  let motorcycleLotsObj = new Map()
  for (let i = 1; i <= motorcycleLots; i++) {
    let str = 'motorcycleLot' + i
    motorcycleLotsObj.set(str, null)
  }
  let occupiedCarLots = 0,
    occupiedMotorLots = 0

  // loop through array from data file
  for (let i = 1; i < arr.length; i++) {
    let details = arr[i].split(' ')
    // switch statements for filtering the enter or exit
    switch (details[0]) {
      case 'Enter':
        // switch statements for filtering car or motorcycle
        switch (details[1]) {
          case 'car':
            // check if there are available lots
            if (occupiedCarLots < carLots) {
              occupiedCarLots++
              // store the car in that particular lot
              for (let [key, value] of carLotsObj.entries()) {
                if (value === null) {
                  carLotsObj.set(key, {
                    plate: details[2],
                    time: details[3],
                  })
                  console.log(`Accept ${key}`)
                  break
                }
              }
            } else {
              // reject if no lots are available
              console.log('Reject')
              break
            }
            break
          case 'motorcycle':
            if (occupiedMotorLots < motorcycleLots) {
              occupiedMotorLots++
              for (let [key, value] of motorcycleLotsObj.entries()) {
                if (value === null) {
                  motorcycleLotsObj.set(key, {
                    plate: details[2],
                    time: details[3],
                  })
                  console.log(`Accept ${key}`)
                  break
                }
              }
            } else {
              console.log('Reject')
              break
            }
            break
        }
        break
      case 'Exit':
        // check if the plate belongs to car or motorcycle
        let licensePlate = details[1]
        let exitTime = details[2]
        let type = null
        // check if car is exiting and print the fee
        for (let [key, value] of carLotsObj.entries()) {
          if (value && licensePlate === value.plate) {
            type = 'car'
            let timeSpent = exitTime - value.time
            let cost = Math.ceil(timeSpent / 3600) * 2
            console.log(key, cost)
            carLotsObj.set(key, null)
            break
          }
        }
        // otherwise find the motorcycle and print the fee
        if (!type) {
          for (let [key, value] of motorcycleLotsObj.entries()) {
            if (licensePlate === value.plate) {
              let timeSpent = exitTime - value.time
              let cost = Math.ceil(timeSpent / 3600) * 1
              console.log(key, cost)
              motorcycleLotsObj.set(key, null)
              break
            }
          }
        }
        break
    }
  }
}
