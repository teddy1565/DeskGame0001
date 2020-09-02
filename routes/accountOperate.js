var fs = require('fs');
/**
 * check Cookie is survive?
 * if Cookie not exisit please show error page
 * @param {object} req --express req Object
 * @return {boolean} return true mean req.session.user is exitis or not
 */
function checkCookie(req){
    if(req.session.user!=undefined){
        return true;
    }else{
        return false;
    }
}
/**
 * query account ID to checking ID exists
 * @param {string} req --ID string
 * @param {string} path --account JSON data path
 * @return {boolean} true is exists or not
 */
function checkID(req,path){
    let data = fs.readFileSync(path,"utf-8");
    data = JSON.parse(data);
    for(let i in data){
        if(`${req}`==`${data[i].ID}`){
            return true;
        }
    }
    return false;
}
/**
 * login function. if return true mean login success
 * @param {object} req --the request account Object
 * @param {string} path 
 * @return {boolean} boolean
 */
function login(req,path){
    let data = fs.readFileSync(path,"utf-8");
    data = JSON.parse(data);
    for(let i in data){
        if(`${req.ID}`==`${data[i].ID}`&&`${req.password}`==`${data[i].password}`){
            return true;
        }
    }
    return false;
}
/**
 * the function will add new account
 * @param {string|object} req --add the reqString account
 * @param {string} path --account JSONfile path
 * @return {string|boolean} if return false or string mean add account is failed
 */
function Register(req,path){
    if(req==undefined)return false;
    let user;
    //user[0] = userName
    //user[1] = password
    if(typeof(req)=="string"){
        req = req.split('&');   
        user = {
            "ID":req[0],
            "password":req[1],
            "score":0
        };
    }else if(typeof(req)=="array"){
        user = {
            "ID":req[0],
            "password":req[1],
            "score":0
        };
    }
    let data = readFileSync(path,"utf-8");
    data = JSON.parse(data);
    for(let i in data){
        if(`${data[i].ID}`==`${user.ID}`){
            return "This ID is exisit";
        }
    }
    data = data.push(user);
    if(fs.writeFileSync(path,JSON.stringify(data))){
        return true;
    }
    return false;
}
exports.checkCookie = checkCookie;
exports.checkID = checkID;
exports.login = login;
exports.Register = Register;