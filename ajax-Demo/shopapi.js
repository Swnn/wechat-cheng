//多商户系统的商户api文件
var config = require('./config.js');
module.exports = {
  /*******************************核心接口区域请勿删除***************************************/
  //登录
  wxlogin: config.SHOP_URL + "wxlogin",
  //支付未支付订单
  pay_order: config.SHOP_URL + "pay_order",
  //检测登录状态
  check_login: config.SHOP_URL + "check_login",
  //检测短信验证码
  check_verify: config.SHOP_URL + "check_verify",
  //发送短信
  send_sms: config.SHOP_URL + "send_sms",
  //一键获取用户手机号码
  decode_phone: config.SHOP_URL + "decode_phone",
  /***************************************自定义接口区***************************************/
  index: config.SHOP_URL + "index",
  banner: config.SHOP_URL + "banner",
  goods: config.SHOP_URL + "goods"
}