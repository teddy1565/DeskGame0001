var express = require('express');
var router = express.Router();
var fs = require('fs');
router.get('/',(req,res,next)=>{
    if(req.session.user==undefined){
        return res.render('FSerror',{title:"ERROR!!請登入帳號"});
    }
    let admin = req.session.user;
    admin = admin.split('&');
    if(admin[0]!="teddy1565"&&admin[1]!="kenjein01"){
        return res.render('FSerror',{title:"ERROR!!請以管理員身份登入"});
    }
    let cardFormI="<form action='/admin/addCARD' METHOD='GET'>"+
                        "<h3>卡片新增</h3><br>"+
                        "<input type='text' name='cardName' placeholder='卡片名稱'><br>"+
                        "<input type='text' name='cost' placeholder='COST'><br>"+
                        "<input type='text' name='attackValue' placeholder='攻擊力'><br>"+
                        "<input type='text' name='defendValue' placeholder='防守力'><br>"+
                        "<textarea name='cardExplan' placeholder='卡片效果說明'></textarea><br>"+
                        "<textarea name='cardProperty' placeholder='卡片屬性添加(按照規範新增,以＆分隔)'></textarea><br>"+
                        "<input type='submit' value='新增卡片'>"+
                  "</form>";
    let cardFormII="<form action='/admin/removeCARD' METHOD='GET'>"+
                        "<h3>卡片移除</h3>"+
                        "<input type='text' name='remID' placeholder='移除之卡片編號'><br>"+
                        "<input type='text' name='remName' placeholder='移除之卡片名稱'><br>"+
                        "<input type='submit' value='移除卡片'><br>"+
                   "</form>";
    let cardFormIII="<form action='/admin/editCARD' METHOD='GET'>"+
                        "<h3>卡片編輯</h3>"+
                        "<input type='text' name='editCardID' placeholder='編輯卡片之編號(必填)'><br>"+
                        "<input type='text' name='editCardName' placeholder='編輯卡片之名稱(選填)'><br>"+
                        "<input type='submit' value='編輯卡片'>"+
                    "</form>";
    res.render('adminEDIT',{cardForm:`${cardFormI}<br>${cardFormII}<br>${cardFormIII}`});
});
router.get('/addCARD',(req,res,next)=>{
    let {cardName,cost,attackValue,defendValue,cardExplan,cardProperty} = req.query;
    let cardPath=__dirname+"/card.json";
    let cardFile = JSON.parse(fs.readFileSync(cardPath,"utf-8"));
    let cardInformation={
        "cardName":cardName,
        "cost":cost,
        "attackValue":attackValue,
        "defendValue":defendValue,
        "cardExplan":cardExplan,
        "cardProperty":cardProperty
    }
    cardFile.push(cardInformation);
    res.render('adminEDIT',{cardForm:"<script>alert(1)</script>"});
});
router.get('/removeCARD',(req,res,next)=>{
    res.render('adminEDIT',{cardForm:"<script>alert(2)</script>"});
});
router.get('/editCARD',(req,res,next)=>{
    res.render('adminEDIT',{cardForm:"<script>alert(3)</script>"});
});
module.exports=router;