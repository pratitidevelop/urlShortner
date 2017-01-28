var express = require('express');
var router = express.Router();
var validurl = require('valid-url');
var shortid = require('shortid');
var UrlShort = require('../models/urlrepo');

var checkValidUrl = function ( req, res, next){
  var urltobechecked = req.body.enteredUrlFromUser;
    if( validurl.isUri( urltobechecked ) ){
        next();
    }else{
        return res.json({
          error : true
        });
    }

}





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('getUrlToShort', { title: 'UrlShortner' });
});


router.get('/:shorturl', function (req, res, next){

  var shorturlfromUser = req.params.shorturl ;
  UrlShort.findOne({ shortenedUrl : shorturlfromUser })
    .exec( function (err, url){
      if(err){
        res.send('ERROR');
      }else{
        res.redirect(url.originalUrl);
      }
    });
});


router.post('/', checkValidUrl , function (req, res){
  

    var shorturl = shortid.generate();
    var obj ={
      originalUrl : req.body.enteredUrlFromUser ,
      shortenedUrl : shorturl
    };

    var url1 = new UrlShort(obj);
    url1.save( function (err, urlcontent){
      if(err){
          return res.json({
            error : true ,
            reason : err
          });
      }else{
        return res.json({
          error : false ,
          shortenedurl : shorturl
        });
      }
    });
});

module.exports = router;
