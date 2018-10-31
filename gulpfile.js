var gulp = require('gulp');
var ejs = require('gulp-ejs');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist',
            index: 'index.html'
        }
    });
});

gulp.task('ejs', function() {
    gulp.src(
       ['src/ejs/*.ejs','!' + 'src/ejs/_*.ejs']
    )
    .pipe(ejs())
    .pipe(rename({extname: '.html'})) //拡張子をhtmlに
    .pipe(gulp.dest('dist/')) //出力先
});

gulp.task('sass', function() {
    gulp.src(
        ['src/css/*.scss', '!' + 'src/css/_*.scss']
    )
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('dist/css/')) //出力先
});

gulp.task('svg', function() {
    gulp.src(
        ['src/svg/*.svg']
    )
    .pipe(gulp.dest('dist/svg/'));
});

gulp.task('js', function() {
    gulp.src(
        ['src/js/*.js']
    )
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

// src 配下の *.html, *.css ファイルが変更されたリロード。
gulp.task('default', ['browser-sync', 'ejs', 'sass', 'svg', 'js'], function () {
    gulp.watch('src/**/*.ejs', ['bs-reload', 'ejs']);
    gulp.watch('src/**/*.scss', ['bs-reload', 'sass']);
    gulp.watch('src/**/*.svg', ['bs-reload', 'svg']);
    gulp.watch('src/**/*.js', ['bs-reload', 'js']);
});
