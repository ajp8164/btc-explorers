'use strict';

var btc = require('btc-lib');

var _ = btc.deps._;
var $ = btc.util.preconditions;
var Address = btc.Address;
var JSUtil = btc.util.js;

function AddressInfo(param) {
  if (!(this instanceof AddressInfo)) {
    return new AddressInfo(param);
  }
  if (param instanceof AddressInfo) {
    return param;
  }

  $.checkArgument(param.address instanceof Address);
  $.checkArgument(_.isNumber(param.balance));
  $.checkArgument(_.isNumber(param.totalSent));
  $.checkArgument(_.isNumber(param.totalReceived));
  $.checkArgument(_.isNumber(param.unconfirmedBalance));
  $.checkArgument(_.isArray(param.transactionIds));
  $.checkArgument(_.all(_.map(param.transactionIds, JSUtil.isHexa)));

  JSUtil.defineImmutable(this, param);
}

AddressInfo.fromExplorer = function(param) {
  if (_.isString(param)) {
    param = JSON.parse(param);
  }
  return new AddressInfo({
    address: new Address(param.addrStr),
    balance: param.balanceSat,
    totalReceived: param.totalReceivedSat,
    totalSent: param.totalSentSat,
    unconfirmedBalance: param.unconfirmedBalanceSat,
    transactionIds: param.transactions
  });
};

module.exports = AddressInfo;
