const apiServ = require('./../services/api')
const Result = require('./../vo/result')
const code = require('./../services/code')
const RegisterDto = require('./../dto/register')
const VideoDto = require('./../dto/video')
module.exports = {
  async login(ctx) {
    if (ctx.session.user) {
      ctx.body = {
        data: `${ctx.session.user.name} 已登录，请勿重复登录`,
        code: code.success
      }
    } else {
      let result = Result.create()
      let formData = ctx.request.body
      console.log('api.js:' + JSON.stringify(result))
      // 数据校验
      let check = apiServ.checkLoginData(formData)
      if (check.success) {
        let user = await apiServ.login(formData)
        // 数据结果校验
        check = apiServ.checkLoginResultData(user)
        if (check.success) {
          result.data = user
          ctx.session.user = user
        }
      }
      result.code = check.code
      ctx.body = result
    }
  },
  async loginOut(ctx) {
    if (ctx.session.user) {
      ctx.session = null
      ctx.body = {
        data: "success",
        code: code.success
      }
    } else {
      ctx.body = {
        data: "error",
        code: code.user_not_login
      }
    }
  },
  async register(ctx) {
    let result = Result.create()
    let formData = ctx.request.body
    let registerDto = RegisterDto.create(formData)
    // 数据校验
    let check = apiServ.checkRegisterBaesData(registerDto)
    if (check.success) {
      check = await apiServ.checkRegisterData(registerDto)
      if (check.success) {
        let data = await apiServ.register(registerDto)
        result.data = data
      }
    }
    result.code = check.code
    ctx.body = result
  },
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
      let formData = ctx.request.query
      if(formData.id){
        let data = await apiServ.getVideo(formData)
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
          code: code.video_empty_id
        }
      }
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
