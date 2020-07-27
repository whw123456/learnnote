var express = require('express');
//rename.js
const fs = require('fs') //引入node内置的文件系统
const path= require('path')
var request = require("request");
var router = express.Router();
var transliteration = require('transliteration');
var loadAppRouter = require('./loadRouter.js');
loadAppRouter.load(router);



/**
 * 清除session
 */
router.get('/app/rename', function (req, res) {
    rename(req, res)
});

function delDir(){

    let files =fs.readdirSync(path.resolve(__dirname,'../newFile/'));
    files =files.map(file=>path.join("newFile",file));
    
    files.forEach(file=>{
        fs.unlinkSync(file);
    })
}
 
function rename(req, res) {
    let newName = []
    fs.readdir(path.resolve(__dirname,'../file/'), (err, oldName) => { //读取file文件夹下的文件的名字，oldName是一个数组
        if (err) {
            return res.json({
                msg: err
            });
        }
        delDir()
        for (let i = 0; i < oldName.length; i++) {
            let name = transliteration.slugify(oldName[i].replace('-','')) // 以图片为例
            newName[i] = name  // 把名字赋给一个新的数组
        }
        for (var i = 0; i < oldName.length; i++) {
            let oldPath = `${path.resolve(__dirname,'../file')}/${oldName[i]}` //原本的路径
            let newPath = `${path.resolve(__dirname,'../newFile')}/${newName[i]}` //新路径
            fs.rename(oldPath, newPath, (err) => { //重命名
                if (err) {
                    return res.json({
                        msg: err
                    });
                    return err
                }
                console.log('done!')
            })
        }
    })
    return res.json({
        msg: "done"
    });
}


/**
 * 清除session
 */
router.post('/app/addLogo', function (req, res) {
   
    try{
        const json=JSON.parse(req.body.school)
        if (!json) {
            return res.json({
                msg: '错误'
            });
        }
        const dede=json.map((item)=>{
            item.logo=transliteration.slugify(item.name)
            return item
        })
        return res.json({
            msg: '成功',
            data:dede
        });
    }catch(e){
      
        return res.json({
            msg: '错误'
        });
    }
});

let access_token=""

const getToken=async function(){
    return new Promise(function(resolve,reject){
        request.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx5492a29783911c5f&secret=291881b747cc3fce4870a7700cc9482c',function(error, response, body){
            if (!error && response.statusCode == 200) {
                resolve(JSON.parse(body).access_token)
            }else{
                reject(error)
            }
        })
    })
}

const addSchoolItem=async function(token,item){
    return new Promise(function(resolve,reject){
        request({
            url: 'https://api.weixin.qq.com/tcb/invokecloudfunction?access_token='+token+'&env=cgjapanese-ls27h&name=addSchoolData',
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(item).replace(/\\r\\n/g,'')
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body)
            }else{
                reject(error)
            }
        }); 
    })
}

const addSchool= async function(token,schoolArr,cb){
    if(token){
        let res=""
        if(schoolArr.length>0){
            for(let item of schoolArr){
                res= await addSchoolItem(token,item)
            }
        }
        cb(res)
    }else{
        access_token=await getToken()
        addSchool(access_token,schoolArr,cb)
    }
}

router.post('/app/addSchool', function(req,res){
    if(req.body.schoolInfo){
        const schoolArr=JSON.parse(req.body.schoolInfo)
        addSchool(access_token,schoolArr,function(resp){
            return res.json({
                msg: resp
            });
        })
    }else{
        return res.json({
            msg: '参数缺失'
        });
    }
})

const getSchool=async function(token,query){
    if(token){
        return new Promise(function(resolve,reject){
            request({
                url: 'https://api.weixin.qq.com/tcb/invokecloudfunction?access_token='+token+'&env=cgjapanese-ls27h&name=getSchoolData',
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    ...query
                })
            }, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(JSON.parse(body).resp_data)
                }else{
                    reject(error)
                }
            })
        }).then(function(res){
            return res
        }); 
    }else{
        access_token=await getToken()
        return getSchool(access_token,query)
    }
}
router.get('/app/getSchool', function(req,res){
    getSchool(access_token,req.query).then(function(resp_data){
        return res.json(JSON.parse(resp_data));
    })
})

const removeSchool=async function(token,query){
    if(token){
        return new Promise(function(resolve,reject){
            request({
                url: 'https://api.weixin.qq.com/tcb/invokecloudfunction?access_token='+token+'&env=cgjapanese-ls27h&name=removeSchoolData',
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    checkList:query
                })
            }, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(body)
                }else{
                    reject(error)
                }
            })
        }).then(function(res){
            return res
        }); 
    }else{
        access_token=await getToken()
        return getSchool(access_token,query)
    }
}

router.post('/app/removeSchool', function(req,res){
    removeSchool(access_token,req.body.checkList).then(function(resp_data){
        return res.json(JSON.parse(resp_data));
    })
})


module.exports = router;