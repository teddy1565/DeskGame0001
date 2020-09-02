var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/',(req,res,next)=>{
    console.log(req.session);
    let mainBody="<h1>hello world</h1><br><input type='button' value='changeAlign' onclick='change()'>";
    let MS="function change(){"+
             "let xhr = new XMLHttpRequest();"+
             `xhr.open('GET','/ajaxTest/score',true);`+
             "xhr.send();"+
             "xhr.onreadystatechange=()=>{"+
                "if(xhr.readyState === XMLHttpRequest.DONE && xhr.status===200){"+
                    "console.log(xhr.responseText);"+
                "}"+
             "};"+
            "}";
    res.render('ajaxTest',{main:mainBody,MainScript:MS});
});
router.get('/score',(req,res,next)=>{
    console.log(req.query);
    res.send("5");
});

module.exports = router;