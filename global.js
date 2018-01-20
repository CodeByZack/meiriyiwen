var _ = require('lodash');

voicePageCount = 0 ;
articleCounts = 0 ;
voiceCounts = 0 ;
dbUtils = require("./db/dbUtils.js");


RandomNum = function (Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.floor(Rand * Range); //舍去
    return num;
}

is_mobile = function (req) {
  var ua = req.get('User-Agent')
  if (_.isEmpty(ua)) {
      return false;
  }
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(ua);
}