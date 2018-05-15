var express = require('express');
var app = express();

let getClientIp = function (req) {
    return req.headers['X-Real-IP'] || req.ip ||
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
};

app.get('/', function (req, res) {
    let arr = [
        {
            domains:'soup.ai',
            ips:'203.156.203.10'
        },
        {
            domains:'proxy.soup.ai',
            ips:'203.156.203.10'
        }
    ]
    let domain = 'soup.ai';

    //let ip = getClientIp(req).match(/\d+.\d+.\d+.\d+/);
    let ip = getClientIp(req);
    //ip = ip ? ip.join('.') : null;

    console.log(ip);

    //let domain = req.headers['referer'];
    /*let domain = req.headers['referer'].match(/^(\w+:\/\/)?([^\/]+)/i);
    domain = domain ? domain[2].split(':')[0].split('.').slice(-2).join('.') : null;*/
    let tag = false;
    arr.forEach((item) =>{
        if(item.domains.match(domain)){
            //console.log(item.domains.match(domain));
            tag = true;
        }
    });

    if(tag){
        res.send('我成功了!');
    }else{
        res.send('我报错了!');
    }


});

var server = app.listen(3009, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});