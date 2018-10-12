const apiModel = require('./../models/api')
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


   checkVideoBaesData(videoDto) {
    let obj = { success: false }
    if (!videoDto.url) {
      obj.code = code.video_empty_url
    } else if (!videoDto.title) {
      obj.code = code.video_empty_title
    } else if (!videoDto.description) {
      obj.code = code.video_empty_description
    } else {
      obj.success = true
      obj.code = code.success
    }
    return obj
  },
  async addVideo(videoDto) {
    let data = await apiModel.createVideo(videoDto)
    if (data) {
      return 'success'
    }
  },

  async checkVideoIdData(formData, userId) {
    let obj = { success: false }
    if (!formData.id) {
      obj.code = code.video_empty_id
    } else{
      let data = await apiModel.findVideoById(formData.id)
      if(data){
        if(data.user_id === userId) {
          obj.success = true
          obj.code = code.success
        } else {
          obj.code = code.video_illegal_id
        }
      } else {
        obj.code = code.video_illegal_id
      }
    }
    return obj
  },

  async delVideo(formData) {
    let data = await apiModel.delVideo(formData.id)
    if (data) {
      return 'success'
    }
  },
  async getVideo(formData) {
    let data = await apiModel.getVideo(formData.id)
    if (data && data.length > 0) {
      return data
    } else {
      return 'error'
    }
  },
  async updateVideo(updateVideoDto) {
    let data = await apiModel.updateVideo(updateVideoDto)
    if (data) {
      return 'success'
    }
  }
}
