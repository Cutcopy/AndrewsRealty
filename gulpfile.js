var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var autowatch = require('gulp-autowatch');

// jade
gulp.task('templates', function() {
  var YOUR_LOCALS = {};

  gulp.src('./jade/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./'))
});

// Get one .styl file and render
gulp.task('stylus', function () {
  gulp.src('./stylus/main.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./css/'));
});

// autoprefixer
gulp.task('autoprefix', function () {
    return gulp.src('./css/')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./css/'));
});

// compress
gulp.task('compress', function () {
  gulp.src('./stylus/main.styl')
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
        .pipe(gulp.dest('img'));
});

// key = task name to run
// value = glob or array of globs to watch
var paths = {
  stylus: './stylus/**/*.styl',
  jade: './jade/**/*.html',
};

gulp.task('watch', function() {
  autowatch(gulp, paths);
});





gulp.task('default', ['templates', 'stylus', 'autoprefix', 'compress', 'imagemin','watch']);
