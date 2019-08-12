var gulp = require("gulp"),
    fileinclude = require("gulp-file-include"), //模板中间件
    plumber=require('gulp-plumber'),//检测错误
    del=require('del'),
    livereload = require('gulp-livereload'),
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
    return gulp
        .src(['workSpace/**/*.html','!workSpace/template','!workSpace/template/*'])
        .pipe(plumber({ errorHandler: errorHandler }))
        .pipe(
            fileinclude({
                prefix: "@@", //变量前缀 @@include
                cssFile: "", //引用文件路径
            })
        )
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
