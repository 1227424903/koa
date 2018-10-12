const dbUtils = require('./../utils/db-util')

module.exports = {

  /**
   * 数据库创建用户
   */
  async createUser(model) {
    let result = await dbUtils.insertData('user', model)
    return result
  },

  /**
   * 查找一个存在用户的数据
   */
  async findUserByEmail(email) {
    let _sql = `
    SELECT * from user
      where email="${email}" limit 1`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },
/**
   * 查找一个存在用户的数据
   */
  async findUserByName(name) {
    let _sql = `
    SELECT * from user
      where name="${name}" limit 1`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },
  /**
   * 根据用户名和密码查找用户
   */
  async getUserByNameAndPwd(formData) {
    let _sql = `
    SELECT * from user
      where password="${formData.pwd}" and name="${formData.name}"
      limit 1`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },

    /**
   * 数据库创建video
   */
  async createVideo(model) {
    let result = await dbUtils.insertData('video', model)
    return result
  },

   /**
   * 数据库删除video 软删除
   */
  async delVideo(id) {
    let _sql = `
    UPDATE video SET active = 0 WHERE id = "${id}" and active = 1`
    let result = await dbUtils.query(_sql)
    return result
  },
     /**
   * 数据库获取video 
   */
  async getVideo(id) {
    let _sql = `
    SELECT * from video
    where id="${id}" and active = 1 limit 1`
    let result = await dbUtils.query(_sql)
    return result
  },
   /**
   * 更新video
   */
  async updateVideo(model) {
    let changes = []
    if(model.title !== undefined){
      changes.push(`title = "${model.title}"`)
    }
    if(model.url !== undefined){
      changes.push(`url = "${model.url}"`)
    }
    if(model.description !== undefined){
      changes.push(`description = "${model.description}"`)
    }
    if(changes.length === 0){
      return 'success'
    }
    let _sql = `
    UPDATE video SET ${changes.join(',')}  WHERE id = "${model.id}" and active = 1`
    let result = await dbUtils.query(_sql)
    return result
  },
  /**
   * 查找video
   */
  async findVideoById(id) {
    let _sql = `
    SELECT user_id from video
      where id="${id}" and active = 1 limit 1`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },
}
