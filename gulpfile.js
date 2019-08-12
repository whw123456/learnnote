var gulp = require("gulp"),
    fileinclude = require("gulp-file-include"), //模板中间件
    plumber=require('gulp-plumber'),//检测错误
    del=require('del'),
    htmlmin = require('gulp-htmlmin'),//html压缩
    nodemon=require('gulp-nodemon'),
    gutil=require('gulp-util');//如果有自定义方法，会用到

//输出错误日志到控制台
function errorHandler(e){
    // 控制台发声,错误时beep一下
    gutil.beep();
    gutil.log(e);
    this.emit('end');
}

// 清除paper
gulp.task("cleanPaper", function(cb) {
    return del("public/*",cb);
});

// html整合
gulp.task("htmlTemplate", function() {
    var options = {
        removeComments: false,//清除HTML注释
        collapseWhitespace: false,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    return gulp
        .src(['workSpace/**/*.html','!workSpace/template','!workSpace/template/*'])
        .pipe(plumber({ errorHandler: errorHandler }))
        .pipe(
            fileinclude({
                prefix: "@@", //变量前缀 @@include
                cssFile: "", //引用文件路径
            })
        )
        // .pipe(htmlmin(options))
        .pipe(gulp.dest("public/"));
});

//启动node
gulp.task('start',function(){
    nodemon({
        script:'./bin/www'
    });
});
gulp.task("watch", function() {
    gulp.watch("workSpace/**/*.html", gulp.series("cleanPaper","htmlTemplate"));
});

gulp.task("default", gulp.parallel ('start','watch'));
