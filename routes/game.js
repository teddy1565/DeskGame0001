var express=require('express');
var router = express.Router();
var fs = require('fs');
router.get('/',(req,res,next)=>{
    if(req.session.user!=undefined){
        if(req.query.match!=undefined&&req.query.match!=" "&&req.query.match!=""){
            //若接受到配對請求則詢問對手是否接受對戰
            //若是接受則放出遊戲頁面若拒絕則回到gameRoute
            res.render('game',{title:"test",errMessage:"",BGI:"",enemyState:"",selfState:"",scoreState:""});
            return 0;
        }
        let backGroundInformation="<style>"+
                                    "body{"+
                                        "text-align:center;"+
                                        "background-color:pink;"+
                                    "}"+
                                  "</style>";
        let userData = req.session.user;
        userData = userData.split('&');
        let enemyStatus = "";
        let selfStatus = "";
        let Score = "<input type='button' value='顯示戰績' onclick='displayScore()'>";
        res.render('game',{title:`歡迎${userData[0]}`,errMessage:"",BGI:backGroundInformation,enemyState:enemyStatus,selfState:selfStatus,scoreState:Score});
    }else{
        let backGroundInformation="<style>"+
                                    "body{"+
                                        "text-align:center;"+
                                        "background-color:red;"+
                                    "}"+
                                  "</style>";
        res.render('game',{title:"請重新登入",enemyState:"",selfState:'',scoreState:'',userScore:"",errMessage:"<h1>ERROR!!!!請重新登入</h1><br><meta http-equiv='refresh' content='3;url=http://localhost:3000'><h1>3秒後回到首頁</h1><br><a href='http://localhost:3000'>或點擊此處回到登入畫面</a>",BGI:backGroundInformation});
    }
});
router.get('/score',(req,res,next)=>{
    if(req.session.user!=undefined){
        let user = req.session.user;
        user = user.split('&');
        let data = fs.readFileSync(__dirname+"/gamer.json",'utf-8');
        data = JSON.parse(data);
        for(let i in data){
            if(`${data[i].ID}`==`${user[0]}`){
                res.send(`${data[i].score}`);
            }
        }
    }else{
        res.send("undefined(something error)");
    }
});
module.exports=router;