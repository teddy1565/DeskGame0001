var express = require('express');
var router = express.Router();
var fs = require('fs');
var socket = require("socket.io")();
/* GET home page. */
function readJSON(path){
  let data = fs.readFileSync(path,Buffer);
  data = JSON.parse(data.toString());
  return data;
}
router.get('/', function(req, res, next) {
  let regForm = "<form action='/' method='POST'>"+
                  "<input type='text' name='acc' placeholder='帳號'><br>"+
                  "<input type='password' name='psw' placeholder='密碼'>"+
                  "<br><input type='submit' value='登入'>"+
                  "</form>";
  if(req.session.user!=undefined){
    res.render('index',{title:'SQL Injection Game',login:"<a href='http://localhost:3000/gameRoute'>ＧＡＭＥ</a>"});
  }else{
    res.render('index', { title: 'SQL Injection Game' , login:regForm });  
  }
});
router.post('/',(req,res,next)=>{
  let {acc,psw} = req.body;
  let path=__dirname+'/gamer.json';
  if(fs.existsSync(path)){//check the path is exists or not
    let data = fs.readFileSync(path,Buffer);
    data = JSON.parse(data.toString());
    let userData = {"ID":acc,"password":psw,"score":0};
    for(let i in data){
      if(userData.ID==data[i].ID){
        if(userData.password==data[i].password){
          req.session.user=`${data[i].ID}&${data[i].password}&${data[i].score}`;
          res.render('account',{message:"登入成功",refresh:"<meta http-equiv='refresh' content='3;url=http://localhost:3000/gameRoute'>",notice:"3秒後轉向遊戲介面"});
          return 0;
        }else{
          res.render('account',{message:"登入失敗",refresh:"<meta http-equiv='refresh' content='3;url=http://localhost:3000/'>",notice:"3秒後轉向首頁"});
          return 1;
        }
      }
    }
    data.push(userData);
    fs.writeFileSync(path,JSON.stringify(data));
    req.session.user=`${userData.ID}&${userData.password}&${userData.score}`;
    res.render('account',{message:"已新增帳號並登入",refresh:"<meta http-equiv='refresh' content='3;url=http://localhost:3000/gameRoute'>",notice:"3秒後轉向遊戲介面"});
    return;
  }else{
    res.render('FSerror',{title:'File System Error'});
    return;
  }
});

module.exports = router;