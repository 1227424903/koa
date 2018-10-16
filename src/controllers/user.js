const apiServ = require('./../services/user')
const Result = require('./../vo/result')
const code = require('./../services/code')
const RegisterDto = require('./../dto/register')

module.exports = {
  async login(ctx) {
    if (ctx.session.user) {
      ctx.body = {
        data: `已登录，请勿重复登录`,
        code: code.success
      }
    } else {
      let result = Result.create()
      let formData = ctx.request.body
      console.log('api.js:' + JSON.stringify(result))
      // 数据校验
      let check = apiServ.checkLoginData(formData)
      result.data = check.data
      if (check.success) {
        let user = await apiServ.login(formData)
        // 数据结果校验
        check = apiServ.checkLoginResultData(user)
        result.data = check.data
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
        data: code.success_msg,
        code: code.success
      }
    } else {
      ctx.body = {
        data: code.user_not_login_msg,
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
    result.data = check.data
    if (check.success) {
      check = await apiServ.checkRegisterData(registerDto)
      result.data = check.data
      if (check.success) {
        let data = await apiServ.register(registerDto)
        result.data = data
      }
    }
    result.code = check.code
    ctx.body = result
  }
}
