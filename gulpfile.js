var gulp = require('gulp');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var autoprefixer = require('gulp-autoprefixer');
var autowatch = require('gulp-autowatch');
var gls = require('gulp-live-server');

 //get styles
gulp.task('style', function () {
	gulp.src('./src/stylus/main.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./css/main.css'));
});

 //get jade
gulp.task('templates', function() {
  var YOUR_LOCALS = {};

  gulp.src('./src/jade/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./*.html'))
});

//autoprefixer
gulp.task('prefix', function () {
    return gulp.src('./css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./css/main-min.css'));
});

// autowatch
var paths = {
  stylus: './src/stylus/*.styl',
  html: './**/*.html',
};

gulp.task('watch', function() {
  autowatch(gulp, paths);
});

//live-server
gulp.task('serve', function() {
    //1. serve with default settings
    var server = gls.static(); //equals to gls.static('public', 3000);
    server.start();

    //use gulp.watch to trigger server actions(notify, start or stop)
    gulp.watch(['./css/*.css', './**/*.html'], function () {
        server.notify.apply(server, arguments);
    });
});

// compress
gulp.task('compress', function () {
  gulp.src('./src/stylus/main.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('./css/'));
});

//imagemin
gulp.task('imagemin', function () {
    return gulp.src('./img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./img/'));
});


gulp.task('default', ['templates', 'style', 'prefix','watch']);
gulp.task('build', ['templates', 'style', 'prefix','compress', 'imagemin']);
