const dbUtils = require('./../utils/db-util')

module.exports = {

  /**
   * 数据库创建用户
   * @param  {object} model 用户数据模型
   * @return {object}       mysql执行结果
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
   * @param  {object} model 用户数据模型
   * @return {object}       mysql执行结果
   */
  async createVideo(model) {
    let result = await dbUtils.insertData('video', model)
    return result
  },

   /**
   * 数据库删除video 软删除
   * @param  {object} model 用户数据模型
   * @return {object}       mysql执行结果
   */
  async delVideo(id) {
    let _sql = `
    UPDATE video SET active = 0 WHERE id = "${id}"`
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
