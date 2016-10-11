var gulp = require('gulp')
 var $ = require('gulp-load-plugins')()
 var runSequence = require('run-sequence')
 var combineTool = require('magix-combine')
 var fs = require('fs')
 var del = require('del')
 var config = require('./config.json')

 /**
  * 配置Magix打包工具
  **/
 combineTool.config({
     tmplFolder: config.tmplFolder,
     srcFolder: config.srcFolder,
     buildFolder: config.buildFolder,
     loaderType: 'amd', //requirejs default === cmd
     excludeTmplFolders: [
         './tmpl/vendor/' //not add define
     ]
 })

 gulp.task('delSrc', function() {
     return del(config.srcFolder)
 })
 /**
  * combine命令: 把tmplFolder下的html和js合并到srcFolder下
  */
 gulp.task('combine', ['delSrc'], function() {
     combineTool.combine()
 })

 gulp.task('watch', ['combine'], function() {
     $.watch('./tmpl/**/*', function(e) {
         if (fs.existsSync(e.path)) {
             combineTool.processFile(e.path)
         } else {
             combineTool.removeFile(e.path)
         }
     })
 })

 gulp.task('delBuild', function() {
     return del('./build')
 })

 gulp.task('build', ['delBuild'], function() {
     gulp.src(config.srcFolder + '/**/*.js')
         .pipe($.uglify({
             compress: {
                 drop_console: true,
                 drop_debugger: true
             }
         }))
         .pipe(gulp.dest(config.buildFolder))

     gulp.src(config.srcFolder + '/**/*.css')
         .pipe($.cssnano({
             safe: true
         }))
         .pipe(gulp.dest(config.buildFolder))
 })


 gulp.task('webserver',  function() {
     gulp.src('./')
         .pipe($.webserver({
             livereload: true,
             open: false,
             port: config.port
         }))
 })



 gulp.task('dev', function(callback) {
     runSequence(
         'watch',
         'webserver',
         callback
     )
 })
