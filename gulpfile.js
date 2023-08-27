let gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    prefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    fileinclude = require('gulp-file-include'),
    gcmq = require('gulp-group-css-media-queries'),
    concat = require('gulp-concat'),
    webp = require('gulp-webp'),
    webphtml = require('gulp-webp-html-nosvg');

gulp.task('html_build', function (done) {
    return gulp.src('src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(webphtml())
        .pipe(gulp.dest('frontend/'));
    done();
});

gulp.task('css_build', function (done) {
    return gulp.src('src/css/*.css')
		.pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('frontend/css/'));
    done();
});

/*

gulp.task('js_build', function (done) {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('frontend/js/'));
    done();
});

*/

gulp.task('fonts_build', function (done) {
    return gulp.src('src/webfonts/*.*')
        .pipe(gulp.dest('frontend/webfonts/'));
    done();
});

gulp.task('img_compress', function (done) {
    return gulp.src('src/img/**/*.*', { soucemaps: true })
        .pipe(webp({quality: 80}))
        .pipe(gulp.dest('frontend/img/', { soucemaps: true }));
    done();
});

gulp.task('img_copy', function (done) {
    return gulp.src('src/img/**/*.*', { soucemaps: true })
        .pipe(gulp.dest('frontend/img/', { soucemaps: true }));
    done();
});

gulp.task('webServer', function (done) {
    /*browserSync.init({
        server: "frontend/"
    });*/
    gulp.watch('src/**/*.html', gulp.series('html_build'));
    gulp.watch('src/**/*.css', gulp.series('css_build'));
    gulp.watch('src/img/**/*.*', gulp.series('img_compress'));
    gulp.watch('src/img/**/*.*', gulp.series('img_copy'));
    gulp.watch('src/assets/fonts/*.*', gulp.series('fonts_build'));
    done();
});


gulp.task('default', gulp.series('html_build', 'css_build', 'fonts_build', 'img_compress', 'webServer', 'img_copy'));
