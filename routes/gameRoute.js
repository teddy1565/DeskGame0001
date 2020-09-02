var express = require("express");
var router = express.Router();
var fs = require('fs');
var accountOperate = require('./accountOperate');
router.get('/',(req,res,next)=>{
    
    if(!accountOperate.checkCookie(req)){
        let Style="<style>"+
                    "body{"+
                         "text-align:center;"+
                         "background-color:pink;"+
                    "}"+
                  "</style>";
        let queryTarget="<script>alert('登入未成功或是尚未登入 請重新登入')</script><a href='/'>點我回首頁</a>";
        let procced="<meta http-equiv='refresh' content='3;url=http://localhost:3000/'>";
        res.render("gameRoute",{formStyle:Style,queryTarget:queryTarget,procced:procced});
        return 0;
    }
    let Style="<style>"+
                "body{"+
                    "background-color:pink;"+
                    "text-align:center"+
                "}"+
              "</style>";
    let queryTarget="<div id='query'><input type='text' id='match' placeholder='輸入玩家ID發起挑戰'><br><input type='button' value='挑戰他' onclick='matchBattle()'></div>";
    
    res.render("gameRoute",{procced:"",queryTarget:queryTarget,formStyle:Style});
});

module.exports = router;