var gulp = require('gulp'),
    haml = require('gulp-haml'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    rigger = require('gulp-rigger'),
    batch = require('gulp-batch');

gulp.task('default', function() {
    watch('./sources/*.haml', batch(function (events, done) {
        gulp.start('haml', done);
    }));

    watch('./sources/scss/***/**/*.scss', batch(function (events, done) {
        gulp.start('styles', done);
    }));

    watch('./sources/js/**/*.js', batch(function (events, done) {
        gulp.start('scripts', done);
    }));
});

gulp.task('haml', function(){
    gulp.src("./sources/*.haml")
        .pipe(rigger())
        .pipe(haml())
        .pipe(gulp.dest("./build/"));
});

gulp.task('styles', function () {
    return gulp.src('./sources/scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./build/css'));
});
