const gulp = require('gulp');
const babel = require('gulp-babel');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');
const runSequence = require('gulp4-run-sequence');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const concatCss = require('gulp-concat-css');
const del = require('del');
const svgo = require('gulp-svgo');
const htmlImport = require('gulp-html-import');

gulp.task('build-project', function(callback) {
    runSequence('1-babel','2-concat','3-uglify','4-prefixer','5-css-concat','6-css-min','7-clean', callback);
});


gulp.task('1-babel', () => {
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('temp/js/'));
});

gulp.task('2-concat', function() {
    return gulp.src('./temp/js/*.js')
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./temp/js'));
});


gulp.task('3-uglify', function () {
    return gulp.src('temp/js/bundle.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/js/'));
});


gulp.task('4-prefixer', () =>
    gulp.src('./src/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('temp/css/'))
);

gulp.task('5-css-concat', function () {
    return gulp.src('./temp/css/*.css')
        .pipe(concatCss("bundle.css"))
        .pipe(gulp.dest('temp/css/'));
});

gulp.task('6-css-min', function () {
    return gulp.src('temp/css/bundle.css')
        .pipe(csso())
        .pipe(gulp.dest('public/css/'));
});

gulp.task('7-clean', function(done) {
    del.sync('temp');
    done();
});

gulp.task('svgo', function(done) {
    gulp.src('src/img/*.svg')
        .pipe(svgo())
        .pipe(gulp.dest('public/img'));

    done();
});

gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['build-project']);
    gulp.watch('src/css/*.css', ['build-project']);
    gulp.watch('src/**/*.html', ['build-HTML']);
});

gulp.task('build-HTML', function (done) {
    gulp.src('./src/*.html')
        .pipe(htmlImport('./src/components/'))
        .pipe(gulp.dest('public'));
    done();
});
