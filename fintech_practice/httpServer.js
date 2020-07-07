var http= require("http");

http 
    .createServer(function(req, res){
        var body = "hello Server";
        res.setHeader("Content-Type","text/html; charset=utf-8");//plaintext
        res.end("<html><body><h1>hello Nodejs Server</h1><hr/><h2>노드</h2></body></html>");//이 경우라면 text/html
    })
    .listen(3000);
