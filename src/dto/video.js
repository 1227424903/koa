const uuid = require('./../utils/uuid-util')
module.exports = {
  create(formData) {
    let obj = {}
    let time = new Date().getTime()
    obj.title = formData.title
    obj.url = formData.url
    obj.description = formData.description
    obj.user_id = formData.userId
    obj.nick = formData.nick
    obj.click = 0
    obj.comment = 0
    obj.create_time = time
    obj.modified_time = time
    obj.active = 1
    obj.id = uuid.random()
    return obj
  }
}