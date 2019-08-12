/**
 * 加载一级二级所有路由
 * Created by yupu01 on 2016/11/10.
 */
var fs = require('fs');
var path = require('path');
var LoadAppRouter = {
    load: function (router) {
        fs.readdir(__dirname, function (err, files) {
            files.forEach(function (dirName, index) {
                if (!dirName.endsWith('.js')&& dirName!='.DS_Store') {
                    fs.readdir(__dirname + path.sep + dirName, function (err, fileNames) {
                        console.log(fileNames)
                        fileNames.forEach(function (fileName, index) {
                            // fileName = path.basename(fileName, '.js');
                            var rou = '/app';
                            if (fileName.endsWith('.js')) {
                                router.use(rou, require('./' + dirName + '/' + fileName));
                            }
                        });
                    });
                }
            });
        });
    }
};
module.exports = LoadAppRouter;