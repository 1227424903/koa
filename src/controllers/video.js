const apiServ = require('./../services/video')
const Result = require('./../vo/result')
const code = require('./../services/code')
const VideoDto = require('./../dto/video')

module.exports = {
  async addVideo(ctx){
    if (ctx.session.user) {
      let result = Result.create()
      let formData = ctx.request.body
      formData.userId = ctx.session.user.id
      let videoDto = VideoDto.create(formData)
      // 数据校验
      let check = apiServ.checkVideoBaesData(videoDto)
      if (check.success) {
          let data = await apiServ.addVideo(videoDto)
          result.data = data
      } else {
        result.data = 'error'
      }
      result.code = check.code
      ctx.body = result
    } else {
      ctx.body = {
        data: "error",
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
        result.data = 'error'
      }
      result.code = check.code
      ctx.body = result
    } else {
      ctx.body = {
        data: "error",
        code: code.user_not_login
      }
    }
  },

  async getVideo(ctx){
    if(ctx.session.user){
      let result = Result.create()
        let data = await apiServ.getVideo()
        result.data = data
        if(data === 'error'){
          result.code = code.video_empty
        } else {
          result.code = code.success
        }
        ctx.body = result
    }else{
      ctx.body={
        data: 'error',
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
        result.data = 'error'
      }
      result.code = check.code
      ctx.body = result
    } else {
      ctx.body = {
        data: "error",
        code: code.user_not_login
      }
    }
  }
}
