
  var mongoose = require('mongoose');
  var urlSchema = new mongoose.Schema(
    {
        originalUrl : String,
        shortenedUrl : {
          type : String,
          unique : true
        }
    }
  );

  module.exports = mongoose.model('UrlShortner', urlSchema );
