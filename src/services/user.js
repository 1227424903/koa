const apiModel = require('./../models/user')
const code = require('./code')
const User = require('./../vo/userVO')
module.exports = {
  async login(formData) {
    let data = await apiModel.getUserByNameAndPwd(formData)
    if (data) {
      return User.create(data)
    }
    return data
  },

  checkLoginData(formData) {
    let obj = { success: false }

    if (!formData.name) {
      obj.code = code.user_empty_name
    } else if (!formData.pwd) {
      obj.code = code.user_empty_pwd
    } else {
      obj.success = true
      obj.code = code.success
    }
    return obj
  },

  checkLoginResultData(user) {
    if (user) {
      return { success: true, code: code.success }
    }
    return { success: false, code: code.user_non }
  },

  async register(registerDto) {
    let data = await apiModel.createUser(registerDto)
    if (data) {
      return User.create(data)
    }
    return data
  },

  checkRegisterBaesData(registerDto) {
    let obj = { success: false }
    if (!registerDto.name) {
      obj.code = code.user_empty_name
    } else if (!registerDto.password) {
      obj.code = code.user_empty_pwd
    } else if (!registerDto.email) {
      obj.code = code.user_empty_email
    } else {
      obj.success = true
      obj.code = code.success
    }
    return obj
  },

  async checkRegisterData(registerDto) {
    let obj = { success: false }
    let data = await apiModel.findUserByName(registerDto.name)
    if (data) {
      obj.code = code.user_exist
    } else {
      obj.success = true
      obj.code = code.success
    }
    return obj
  },

}
