const gulp = require('gulp');
const { src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const gulpIf = require('gulp-if');
const browserSync = require('browser-sync').create();

const isDev = true;

gulp.task('sass', function () {
    return src('src/scss/**/*.scss')
        .pipe(gulpIf(isDev, sourcemaps.init()))
        .pipe(autoprefixer())
        .pipe(sass())
        .pipe(concat('bundle.css'))
        .pipe(cleanCss())
        .pipe(gulpIf(isDev, sourcemaps.write()))
        .pipe(dest('build'))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    return src('src/*.html')
        .pipe(dest('build'))
        .pipe(browserSync.stream());;
});


gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './build',
        }
    });

    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('src/*.html', gulp.series('html'));
});

gulp.task('dev', gulp.series('sass', 'html', 'serve'));

gulp.task('build', gulp.series('sass', 'html'));
