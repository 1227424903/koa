const uuid = require('./../utils/uuid-util')
module.exports = {
  create(formData) {
    let obj = {}
    let time = new Date().getTime()
    obj.email = formData.email
    obj.password = formData.pwd
    obj.name = formData.name
    obj.nick = formData.nick
    obj.create_time = time
    obj.modified_time = time
    obj.level = formData.level ? formData.level : 0
    obj.id = uuid.random()
    return obj
  }
}