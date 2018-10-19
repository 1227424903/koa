const apiServ = require('./../services/video')
const Result = require('./../vo/result')
const code = require('./../services/code')
const VideoDto = require('./../dto/video')
var urlencode = require('urlencode')

module.exports = {
  async addVideo(ctx){
    if (ctx.session.user) {
      let result = Result.create()
      let formData = ctx.request.body
      formData.userId = ctx.session.user.id
      formData.nick = urlencode.decode(ctx.session.user.nick)
      let videoDto = VideoDto.create(formData)
      // 数据校验
      let check = apiServ.checkVideoBaesData(videoDto)
      if (check.success) {
          let data = await apiServ.addVideo(videoDto)
          result.data = data
      } else {
        result.data = check.data
      }
      result.code = check.code
      ctx.body = result
    } else {
      ctx.body = {
        data: code.user_not_login_msg,
        code: code.user_not_login
      }
    }
  },
  async delVideo(ctx){
    if (ctx.session.user) {
      let result = Result.create()
      let formData = ctx.request.body
      // 数据校验
      let check = await apiServ.checkVideoIdData(formData, ctx.session.user.id)
      if (check.success) {
          let data = await apiServ.delVideo(formData)
          result.data = data
      } else {
        result.data = check.data
      }
      result.code = check.code
      ctx.body = result
    } else {
      ctx.body = {
        data: code.user_not_login_msg,
        code: code.user_not_login
      }
    }
  },

  async getVideo(ctx){
    if(ctx.session.user){
      let result = Result.create()
        let data = await apiServ.getVideo()
        if(data === 'error'){
          result.code = code.video_empty
          result.data = code.video_empty_msg
        } else {
          result.code = code.success
          result.data = data
        }
        ctx.body = result
    }else{
      ctx.body={
        data: code.user_not_login_msg,
        code: code.user_not_login
      }
    }
  },
  async updateVideo(ctx){
    if (ctx.session.user) {
      let result = Result.create()
      let formData = ctx.request.body
      // 数据校验
      let check = await apiServ.checkVideoIdData(formData, ctx.session.user.id)
      if (check.success) {
          let data = await apiServ.updateVideo(formData)
          result.data = data
      } else {
        result.data = check.data
      }
      result.code = check.code
      ctx.body = result
    } else {
      ctx.body = {
        data: code.user_not_login_msg,
        code: code.user_not_login
      }
    }
  }
}
