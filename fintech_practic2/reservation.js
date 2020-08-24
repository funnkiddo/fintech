const express = require("express");
const app = express();
const path = require("path");
const request = require("request");
var mysql = require("mysql");
const jwt = require("jsonwebtoken");
const auth  = require("./lib/auth");

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));


app.get("/reservation", function (req, res) {
    res.render("reservation");
});

app.get("/modal", function (req, res) {
    res.render("modal");
});

app.get("/payment", function (req, res) {
    res.render("payment");
    
});
app.get("/complete", function (req, res) {
    res.render("complete");
});
app.post("/complete", function (req, res) {

});
app.post("/payment", function (req, res) {

    console.log(req.body);
    var name = req.body.name;
    var email = req.body.email;
    var pet =  req.body.Pet;
    var Date = req.body.Date;
    var Time = req.body.Time;
    var Style = req.body.Style;
    var Total = req.body.Total;

});
//POST
app.post("/reservation",function(req, res){
    console.log(req.body);

});

  app.post("/login", function (req, res) {  //http request의 객체를 데이터를 body에 담아 전달함
    console.log("사용자 입력정보 :", req.body);
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    var tokenKey = "fintech";
    var userId = 1;
    jwt.sign(
        {
        userId: userId,
        userEmail: userEmail,
        },
    tokenKey,
        {
        expiresIn: "10d",
        issuer: "fintech.admin",
        subject: "user.login.info",
        },
    function (err, token) {
        console.log("로그인 성공", token);
        res.json(token);
    });
    });

    app.post("/withdraw", function (req, res) {
      //var userId = req.decoded.userId;
    var fin_use_num = req.body.fin_use_num;
    var amount = req.body.amount;
    var to_fin_use_num = req.body.to_fin_use_num;
    console.log("출금 핀테크번호, 입금할 핀테크번호, 출금금액", fin_use_num, to_fin_use_num, amount);

      var countnum = Math.floor(Math.random() * 1000000000);
      var transId = "T991641470U" + countnum; //이용기관번호 본인것 입력
        var option = {
            method: "POST",
            url: "https://testapi.openbanking.or.kr/v2.0/transfer/withdraw/fin_num",
            headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAwNzYwNTU1Iiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2MDI0ODEzNDUsImp0aSI6IjUxMmUyZTY2LWRhMzAtNDMxNS05YTBmLTk3MGNlZGU4OTIyYSJ9.XsmDfTXaj4lNBa2124IQD09fnEnROvXeUhw-pm4JyXA",
            },
            //form 형태는 form / 쿼리스트링 형태는 qs / json 형태는 json ***
            json: {
                bank_tran_id: transId, 
                cntr_account_type: "N",
                cntr_account_num: "8518142015", 
                dps_print_content: "쇼핑몰환불", 
                fintech_use_num: fin_use_num, 
                wd_print_content: "오픈뱅킹출금",
                tran_amt: "10000",
                tran_dtime: "20200721110000", 
                req_client_name: "홍길동", 
                req_client_fintech_use_num: fin_use_num,
                transfer_purpose: "ST",
                req_client_num: "HONGGILDONG1234",
                recv_client_name: "정혜빈",
                recv_client_bank_code: "097",
                recv_client_account_num: "8518142015"
            },
        };
        request(option, function (err, response, body) {
            console.log(body);
            res.json(body);
            });
        });


app.listen(3000, function () {  //포트설정
    console.log(" http://localhost:3000/reservation");
});
