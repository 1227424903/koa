const apiModel = require('./../models/video')
const code = require('./code')
const Video = require('./../vo/videoVO')
module.exports = {

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
  async getVideo() {
    let data = await apiModel.getVideo()
    if (data && data.length > 0) {
      let result = []
      data.forEach(element => {
        result.push(Video.create(element))
      })
      return result
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
