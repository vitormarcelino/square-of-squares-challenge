'use strict'

class StoreTerritory {
  get rules () {
    return {
      name: "required",
      start: "required|position",
      end: "required|position"
    }
  }

  get messages () {
    return {
      'name.required': `Error: territories/incomplete-data: You must provide a name`,
      'start.required': `Error: territories/incomplete-data: You must provide a start`,
      'end.required': `Error: territories/incomplete-data: You must provide a end`,
      'start.position': `Error: territories/incomplete-data: start schema is wrong`,
      'end.position': `Error: territories/incomplete-data: end schema is wrong`
    }
  }
}

module.exports = StoreTerritory
