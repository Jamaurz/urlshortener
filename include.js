module.exports = function(app, db) {

    function randomChar() {
        return String.fromCharCode(65 + Math.floor(Math.random() * 20));
    }
    function randomUrl() {
        var leng = 4;
        var randUrl = Math.floor(Math.random() * Math.pow(10, leng));
        randUrl = String(randUrl).split('');
        var randPos = Math.floor(Math.random() * leng);
        var randPos2 = Math.floor(Math.random() * leng);
        randUrl.splice(randPos, 0, randomChar());
        randUrl.splice(randPos2, 0, randomChar());
        return randUrl.join('');
    }
    function validateURL(url) {
        // Regex from https://gist.github.com/dperini/729294
        var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
        return regex.test(url);
    }
    
    function isExist(obj, db, record, res) {
        var site = db.collection('site');
        site.findOne({
            "original_url": record
        },{
          _id: false ,
          original_url: true,
          short_url: true
        }, function(err, result) {
            if (err) throw err;
            if (result) {
                console.log('This url has already exist');
                res.send(result);
            } else {
                console.log('obj', obj);
                var obj2 = {
                    "original_url": obj.original_url,
                    "short_url": obj.short_url
                }
                console.log(obj2, 'obj2');
                save(obj2, db)
                res.send(obj);  
            }
        }); 
    }
    
    function save(obj, db) {
        var site = db.collection('site');
        
        site.insert(obj, function(err, result) {
            if (err) throw err;
            console.log('Saved');
        });
    }
    
    function find(url, db, res) {
        var site = db.collection('site');

        site.findOne({
            "short_url": url
        }, {
            _id: false,
            original_url: true,
            short_url: true
        }, function(err, result) {
            if (err) throw err;
            if (result) {
                console.log('Redirecting to ', result.original_url);
                res.redirect(result.original_url);
            } else {
                res.send({
                    "error": "This url isn't on the database."
                });
            }
        });
   }
   
    app.get('/new/:url*', function(req, res) {
        var record = req.url.slice(5);
        var isValid = validateURL(record);
        var obj = {};
        
        if(isValid) {
            obj = {
                "original_url": record,
                "short_url": process.env.APP_URL + randomUrl()
            };
            isExist(obj, db, record, res);
        } else {
            obj = {
                "error": "Wrong url format."
              };
            res.send(obj);
        }
    });
    
    app.get('/:url', function(req, res) {
        var link = process.env.APP_URL + req.params.url;
        find(link, db, res);
    });
}