const fs = require('fs')
const stdin = require('get-stdin')

// https://stackoverflow.com/questions/11887934/how-to-check-if-the-dst-daylight-saving-time-is-in-effect-and-if-it-is-whats
Date.prototype.stdTimezoneOffset = function() {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}
Date.prototype.dst = function() {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
}
const dst = (new Date).dst()

const dateStr = (new Date).toString()
const zone = dateStr.slice(dateStr.length-4, dateStr.length-1)

const zoneOffsets = {
  P: 0,
  M: 1,
  C: 2,
  E: 3
}

// default to ET
const zoneTo = (process.argv[2] ? process.argv[2][0] : 'E') + `${dst ? 'D' : 'S'}T`
const offset = zoneOffsets[zoneTo[0]] - zoneOffsets[zone[0]]

stdin().then(input => {

  const output = input.split('\n')
  .filter(x => x)
  .map(line => line.replace(/(\d+)(am|pm)?(?:-(\d+))?(am|pm)/gi, (match, ...matches) => {
    const [start, startMeridiem, end, endMeridiem] = matches
    const shiftStartMeridiem = +start + offset >= 12
    const shiftEndMeridiem = +end + offset >= 12

    const startNew = (+start + offset)%12 || 12
    const startMeridiemNew = shiftStartMeridiem ? 'pm' :
      shiftEndMeridiem ? 'am' :
      startMeridiem || ''

    const endNew = (+end + offset)%12 || 12
    const endMeridiemNew = shiftEndMeridiem ? 'pm' :
      shiftEndMeridiem ? 'am' :
      endMeridiem || ''

    return `${startNew}${startMeridiemNew === endMeridiemNew ? '' : startMeridiemNew}` + (end ? `-${endNew}${endMeridiemNew}` : '')
  }))
  .map(line => `${line} ${zoneTo}`)
  .join('\n')

  console.log(output)
})
