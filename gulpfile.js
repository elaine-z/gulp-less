// 引入gulp及其组件
var gulp = require('gulp');
var less = require('gulp-less');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

// ./代表根目录
// 编译less
gulp.task('less', function() {
	gulp.src('./less/**/*.less') //匹配当前目录及其子目录下的所有文件
		.pipe(less())
		.pipe(gulp.dest('./css'));
});
// 压缩图片
gulp.task('images', function() {
	gulp.src('./images/*.{png,jpg,gif.ico}')
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/image'));
});
//合并压缩js
gulp.task('scripts', function() {
	gulp.src('./js/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(rename('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'));
});
// 启动服务器
gulp.task('connect', function() {
	connect.server({
		root: './',
		livereload: true
	});
});
gulp.task('html', function() {
	gulp.src('./www/*.html')
		.pipe(connect.reload());
});
// 默认任务
gulp.task('watch', function() {
	gulp.watch('./www/*.html', ['html']);
	gulp.watch('./less/*.less', ['less', 'html']);
	gulp.watch('./js/*.js', ['scripts', 'html']);
	gulp.watch('./images/*.{png,jpg,gif,ico}', ['images'])
});
gulp.task('default', ['scripts', 'less', 'images', 'connect', 'watch']);