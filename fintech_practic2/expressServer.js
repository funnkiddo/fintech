const express = require("express");
const app = express();
const path = require("path");
const request = require("request");
var mysql = require("mysql");
const jwt = require("jsonwebtoken");
const auth  = require("./lib/auth");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "nameis980214",
  database: "fintech",
  port: "3306",
});

connection.connect();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public"))); //to use static asset

app.get("/signup", function (req, res) {
  res.render("signup");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/authTest", auth, function (req, res) {
  res.json("환영합니다 우리 고객님");
});
app.get("/main", function (req, res) {
  res.render("main");
});
app.get("/balance", function (req, res) {
  res.render("balance");
});
app.get("/qrcode", function (req, res) {
  res.render("qrcode");
});
app.get("/qrreader", function (req, res) {
  res.render("qrreader");
});
app.get("/authResult", function (req, res) {
  var authCode = req.query.code;
  console.log("인증코드 : ", authCode);
  var option = {
    method: "POST",
    url:"https://testapi.openbanking.or.kr/oauth/2.0/token",
    headers:{
        "Content-Type":"applicataion/x-www-form-urlencoded"
    },
    form:{
        code:authCode,
        client_id:"8muhN9jafR6oJvSKVzl2skkbxEfbt6W5LHO7Hf1l",
        client_secret:"73OqsxBInUVCJBEeSmDMwOwYohdge3WN1i4gIgjF",
        redirect_uri:"http://localhost:3000/authResult",
        grant_type:"authorizaton_code"
    },
  };

  request(option, function (error, response, body) { 
    var accessRequestResult = JSON.parse(body);
    console.log(accessRequestResult);
    res.render("resultChild",{data:accessRequestResult});
  });

});

app.post("/signup", function (req, res) {
  console.log(req.body);
  var userName = req.body.userName;
  var userPassword = req.body.userPassword;
  var userEmail = req.body.userEmail;
  var userAccessToken = req.body.userAccessToken;
  var userRefreshToken = req.body.userRefreshToken;
  var userSeqNo = req.body.userSeqNo;

  var sql =
    "INSERT INTO user (`name`, `email`, `password`, `accesstoken`, `refreshtoken`, `userseqno`) VALUES (?, ?, ?, ?, ?, ?)";
  connection.query(
    sql,
    [
      userName,
      userEmail,
      userPassword,
      userAccessToken,
      userRefreshToken,
      userSeqNo,
    ],
    function (error, results) {
      if (error) throw error;
      else {
        console.log("sql: ",this.sql);
        res.json(1)
      }
    }
  );
});

app.post("/login", function (req, res) {
  console.log("사용자 입력정보 :", req.body);
  var userEmail = req.body.userEmail;
  var userPassword = req.body.userPassword;
  var sql = "SELECT * FROM user WHERE email = ?";
  connection.query(sql, [userEmail], function (error, results, fields) {
    if (error) throw error;
    else {
      if (results.length == 0) {
        res.json("등록되지 않은 아이디 입니다.");
      } else {
        var dbPassword = results[0].password;
        if (userPassword == dbPassword) {
          var tokenKey = "f@i#n%tne#ckfhlafkd0102test!@#%";
          jwt.sign(
            {
              userId: results[0].id,
              userEmail: results[0].email,
            },
            tokenKey,
            {
              expiresIn: "10d",
              issuer: "fintech.admin",
              subject: "user.login.info",
            },
            function (err, token) {
              console.log("로그인 성공","\n",token);
              res.json(token);
            }
          );

        } else {
          res.json("비밀번호가 다릅니다!");
        }
      }
    }
  });
});
app.post("/list", auth, function (req, res) {
  var userId = req.decoded.userId;
  var sql = "SELECT * FROM user WHERE id = ?";
  connection.query(sql, [userId], function (error, results) {
    if (error) {
      console.error(error);
      throw error;
    } else {
      console.log("list에서 조회한 개인 값:",results);
      var option = {
        method: "GET",
        url: "https://testapi.openbanking.or.kr/v2.0/user/me",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + results[0].accesstoken,
        },
        //form 형태는 form / 쿼리스트링 형태는 qs / json 형태는 json ***
        qs: {
          user_seq_no: results[0].userseqno,
        },
      };
      request(option, function (error, response, body) {
          var listResult = JSON.parse(body);
          console.log(listResult);
          res.json(listResult);
        
      });
    }
  });
});

app.post('/balance',auth, function(req,res){
  var userId = req.decoded.userId;
  var fin_use_num = req.body.fin_use_num
  var random_num = Math.floor(Math.random()*1000000000)

  console.log("유저아이디 , 핀테크 번호",userId,fin_use_num)

  var sql = "SELECT * FROM user WHERE id = ?";
  connection.query(sql, [userId], function (error, results) {
    if (error) {
      console.error(error);
      throw error;
    } else {
      console.log("list에서 조회한 개인 값:",results);
      var option = {
        method: "GET",
        url: "https://testapi.openbanking.or.kr/v2.0/account/balance/fin_num",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + results[0].accesstoken,
        },
        //form 형태는 form / 쿼리스트링 형태는 qs / json 형태는 json ***
        qs: {
          bank_tran_id : "T991641610U"+random_num,
          fintech_use_num : "199164161057885124706187",
          tran_dtime : "20200716125600"
        },
      };
      request(option, function (error, response, body) {
          var balanceResult = JSON.parse(body);
          console.log(balanceResult);
          res.json(balanceResult);
        
      });
    }
  });
});
app.post('/transaction',auth, function(req,res){
  var userId = req.decoded.userId;
  var fin_use_num = req.body.fin_use_num
  var random_num = Math.floor(Math.random()*1000000000)

  console.log("유저아이디 , 핀테크 번호",userId,fin_use_num)

  var sql = "SELECT * FROM user WHERE id = ?";
  connection.query(sql, [userId], function (error, results) {
    if (error) {
      console.error(error);
      throw error;
    } else {
      console.log("list에서 조회한 개인 값:",results);
      var option = {
        method: "GET",
        url: "https://testapi.openbanking.or.kr/v2.0/account/transaction_list/fin_num",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + results[0].accesstoken,
        },
        //form 형태는 form / 쿼리스트링 형태는 qs / json 형태는 json ***
        qs: {
          bank_tran_id : "T991641610U"+random_num,
          fintech_use_num : "199164161057885124706187",
          inquiry_type : "A",
          inquiry_base : "D",
          from_date : "20200101",
          to_date : "20200716",
          sort_order : "D",
          tran_dtime : "20200716144000"
        },
      };
      request(option, function (error, response, body) {
          var listResult = JSON.parse(body);
          console.log(listResult);
          res.json(listResult);
        
      });
    }
  });

});
app.post("/withdraw", auth, function (req, res) {
  var userId = req.decoded.userId;
  var fin_use_num = req.body.fin_use_num;
  console.log("유저 아이디, 핀테크번호 : ", userId, fin_use_num);

  var random_num = Math.floor(Math.random()*1000000000)


  var sql = "SELECT * FROM user WHERE id = ?";
  connection.query(sql, [userId], function (err, results) {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(("list 에서 조회한 개인 값 :", results));
      var option = {
        method: "POST",
        url: "https://testapi.openbanking.or.kr/v2.0/transfer/withdraw/fin_num",
        headers: {
          Authorization: "Bearer " + results[0].accesstoken,
          "Content-Type": "application/json",
        },
        //form 형태는 form / 쿼리스트링 형태는 qs / json 형태는 json ***
        json: {
          bank_tran_id : "T991641610U"+random_num,
          cntr_account_type:"N",
          cntr_account_num:"0987579284",
          dps_print_content:"오늘의 이체",
          fintech_use_num:"199164161057885124706187",
          wd_print_content:"오픈뱅킹출금",
          tran_amt:"99999",
          tran_dtime:"20200721105600",
          req_client_name:"황채연",
          req_client_bank_code:"097",
          req_client_account_num:"124412341234",
          req_client_num:"1100760564",
          transfer_purpose:"ST",
          // sub_frnc_business_num:"1234567890",
          recv_client_name:"황채연",
          recv_client_bank_code:"097",
          recv_client_account_num:"0987579284",
        },
      };
      request(option, function (error, response, body) {
        console.log(body);
        var countnum2 = Math.floor(Math.random() * 1000000000) + 1;
        var transId2 = "T991641610U" + countnum2; //이용기과번호 본인것 입력

        var option = {
          method: "POST",
          url:
            "https://testapi.openbanking.or.kr/v2.0/transfer/deposit/fin_num",
          headers: {
            Authorization:
              "Bearer " +
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAwNzYwNTY0Iiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2MDI0ODEzMDcsImp0aSI6ImNlZjBjMjk3LTQ0ZDYtNDc0OS1hNzc4LTQyZTQxYmVhOWI1YSJ9.w7Y34yUO0FfKCWpZAF0dBWepFbBYrx_x5RnTCUFdoKo",
            "Content-Type": "application/json",
          },
          json: {
            cntr_account_type: "N",
            cntr_account_num: "123412341234",
            wd_pass_phrase: "NONE",
            wd_print_content: "환불금액",
            name_check_option: "on",
            tran_dtime: "20200721151500",
            req_cnt: "1",
            req_list: [
              {
                tran_no: "1",
                bank_tran_id: transId2,
                fintech_use_num: to_fin_use_num,
                print_content: "오늘의 이체",
                tran_amt: amount,
                req_client_name: "황채연",
                req_client_fintech_use_num: "199164161057885124706187",
                req_client_num: "098757928",
                transfer_purpose: "ST",
              },
            ],
          },
        };
        request(option, function (error, response, body) {
          console.log(body);
        });
      });
    }
  });
});

app.listen(3000, function () {
  console.log("Example app listening at http://localhost:3000");
});


