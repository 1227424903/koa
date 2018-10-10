const apiServ = require('./../services/api')
const Result = require('./../vo/result')
const RegisterDto = require('./../dto/register')
module.exports = {
  async login(ctx) {
    if (ctx.session.user) {
      ctx.body = {
        data: `${ctx.session.user.name} 已登录，请勿重复登录`
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
  async loginout(ctx) {
    if (ctx.session.user) {
      ctx.session = null
      ctx.body = {
        data: "您已注销"
      }
    } else {
      ctx.body = {
        data: "您未登录"
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
  }
}
