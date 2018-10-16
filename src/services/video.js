const apiModel = require('./../models/video')
const code = require('./code')
const Video = require('./../vo/videoVO')
module.exports = {

   checkVideoBaesData(videoDto) {
    let obj = { success: false }
    if (!videoDto.url) {
      obj.code = code.video_empty_url
      obj.data = code.video_empty_url_msg
    } else if (!videoDto.title) {
      obj.code = code.video_empty_title
      obj.data = code.video_empty_title_msg
    } else if (!videoDto.description) {
      obj.code = code.video_empty_description
      obj.data = code.video_empty_description_msg
    } else {
      obj.success = true
      obj.code = code.success
      obj.data = code.success_msg
    }
    return obj
  },
  async addVideo(videoDto) {
    let data = await apiModel.createVideo(videoDto)
    if (data) {
      return code.success_msg
    }
  },

  async checkVideoIdData(formData, userId) {
    let obj = { success: false }
    if (!formData.id) {
      obj.code = code.video_empty_id
      obj.data = code.video_empty_id_msg
    } else{
      let data = await apiModel.findVideoById(formData.id)
      if(data){
        if(data.user_id === userId) {
          obj.success = true
          obj.code = code.success
          obj.data = code.success_msg
        } else {
          obj.code = code.video_illegal_id
          obj.data = code.video_illegal_id_msg
        }
      } else {
        obj.code = code.video_illegal_id
        obj.data = code.video_illegal_id_msg
      }
    }
    return obj
  },

  async delVideo(formData) {
    let data = await apiModel.delVideo(formData.id)
    if (data) {
      return data.success_msg
    }
  },
  async getVideo() {
    let data = await apiModel.getVideo()
    if (data && data.length > 0) {
      let result = []
      data.forEach(element => {
        result.push(Video.create(element))
      })
      return result
    } else {
      return code.sys_err_msg
    }
  },
  async updateVideo(updateVideoDto) {
    let data = await apiModel.updateVideo(updateVideoDto)
    if (data) {
      return code.success_msg
    }
  }
}
