module.exports = {
  create(videoDO) {
    let obj = {}
    obj.title = videoDO.title
    obj.url = videoDO.url
    obj.description = videoDO.description
    obj.userId = videoDO.user_id
    obj.nick = videoDO.nick
    obj.click = videoDO.click
    obj.comment = videoDO.comment
    obj.createTime = videoDO.create_time
    obj.modifiedTime = videoDO.modified_time
    obj.id = videoDO.id
    return obj
  }
}
