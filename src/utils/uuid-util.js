const uuid = require('uuid')
module.exports = {
  random1() {
    let data = uuid.v4()
    return data
  },

  random() {
    let data = uuid.v1()
    return data
  }
}