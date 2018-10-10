module.exports = {
  create(userDO) {
    let obj = {}
    obj.name = userDO.name
    obj.nick = userDO.nick
    obj.id = userDO.id
    obj.email = userDO.email
    obj.createTime = userDO.create_time
    obj.modifiedTime = userDO.modified_time
    obj.level = userDO.level
    return obj
  }
}
