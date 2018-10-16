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
      obj.data = code.user_empty_name_msg
    } else if (!formData.pwd) {
      obj.code = code.user_empty_pwd
      obj.data = code.user_empty_pwd_msg
    } else {
      obj.success = true
      obj.code = code.success
      obj.data = code.success_msg
    }
    return obj
  },

  checkLoginResultData(user) {
    if (user) {
      return { success: true, code: code.success, data: code.success_msg}
    }
    return { success: false, code: code.user_non, data: code.user_non_msg }
  }, 

  async register(registerDto) {
    let data = await apiModel.createUser(registerDto)
    if (data) {
      return code.success_msg
    }
    return data
  },

  checkRegisterBaesData(registerDto) {
    let obj = { success: false }
    if (!registerDto.name) {
      obj.code = code.user_empty_name
      obj.data = code.user_empty_name_msg
    } else if (!registerDto.password) {
      obj.code = code.user_empty_pwd
      obj.data = code.user_empty_pwd_msg
    } else if (!registerDto.email) {
      obj.code = code.user_empty_email
      obj.data = code.user_empty_email_msg
    } else {
      obj.success = true
      obj.code = code.success
      obj.data = code.success_msg
    }
    return obj
  },

  async checkRegisterData(registerDto) {
    let obj = { success: false }
    let data = await apiModel.findUserByName(registerDto.name)
    if (data) {
      obj.code = code.user_exist
      obj.data = code.user_exist_msg
    } else {
      obj.success = true
      obj.code = code.success
      obj.data = code.success_msg
    }
    return obj
  },

}
