//api文件
var config = require('./config.js');
module.exports = {
  /*******************************核心接口区域请勿删除***************************************/
  //登录
  wxlogin: config.API_URL + "login",
  //支付未支付订单
  pay_order: config.API_URL + "pay_order",
  //检测登录状态
  check_login: config.API_URL + "check_login",
  //检测短信验证码
  check_verify: config.API_URL + "check_verify",
  //发送短信
  send_sms: config.API_URL + "send_sms",
  //一键获取用户手机号码
  decode_phone: config.API_URL + "decode_phone",
  /***************************************自定义接口区***************************************/
  index: config.API_URL + "index",
  detail: config.API__URL + "activity_detail",
 
}