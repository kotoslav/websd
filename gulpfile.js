let gulp     = require('gulp'),
sass         = require('gulp-sass'),
prefixer = require('gulp-autoprefixer'),
cssmin     = require('gulp-clean-css'),
uglify       = require('gulp-uglify'),
fileinclude = require('gulp-file-include'),
gcmq = require('gulp-group-css-media-queries');
let concat = require('gulp-concat');

gulp.task('html_build', function (done) {
    return gulp.src('src/*.html')
        .pipe(fileinclude())
        .pipe(gulp.dest('frontend/'));
    done();
});

gulp.task('css_build', function (done) {
    return gulp.src('src/assets/*.css')
        .pipe(prefixer())
        .pipe(gcmq())
        .pipe(cssmin())
        .pipe(gulp.dest('frontend/css/'));
    done();
});

gulp.task('js_build', function (done) {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('frontend/js/'));
    done();
});

gulp.task('fonts_build', function (done) {
    gulp.src('src/webfonts/*.*')
        .pipe(gulp.dest('frontend/webfonts/'));
    done();
});



gulp.task('default', gulp.series('html_build', 'css_build', 'js_build', 'fonts_build'));
