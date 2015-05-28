'use strict';

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var pingpp = require('pingpp')('YOUR-KEY');//TODO YOUR-KEY like sk_test_XXXXXXXXXXXXXXXXXXXXXXXX or sk_live_XXXXXXXXXXXXXXXXXXXXXXXX

var app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json()); // parse application/json

app.post('/pay', function(req, res) {
  // 创建 charge
  var clientIp = req.ip;
  var params = req.body;
  var channel = params.channel.toLocaleLowerCase();
  var amount = params.amount;

  createCharge(channel, amount, clientIp, function(err, charge) {
    if (charge == null) {
      return res.status(400).json({error: err.raw});
    }

    return res.json(charge);
  });
});

app.listen(8010, '0.0.0.0');

var createCharge = function(channel, amount, clientIp, callbackFunc) {
  var extra = {};
  // 商户系统自己生成的订单号。如果是【壹收款】，则使用客户端传上来的 'order_no'。
  var orderNo = crypto.createHash('md5')
    .update(new Date().getTime().toString())
    .digest('hex').substr(0, 12);

  console.log(orderNo);

  pingpp.charges.create({
    order_no: orderNo,
    app: {id: "YOUR-APP-ID"},//TODO YOUR-APP-ID like app_XXXXXXXXXXXXXXXX
    channel: channel,
    amount: amount,
    client_ip: clientIp,
    currency: "cny",
    subject: "Charge Subject",
    body: "Charge Body",
    extra: extra
  }, callbackFunc);
};
