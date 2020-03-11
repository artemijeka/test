'use strict';
/* config */
const DEV = {
    ROOT: './dev/',
    FILES: [
        './dev/*.*',
        './dev/**/fonts/*.*',
        './dev/**/img/**/*.*',
        './dev/**/.htaccess',
        './dev/**/*.html',
        // './src/**/*.php',
        // './src/**/*.settings'
    ],
    // HTML: './dev/**/*.html',
    CSS: {
        HEADER: ['./dev/css/vendor/header.min.css', './dev/css/header.min.css'],
        FOOTER: ['./dev/css/vendor/footer.min.css', './dev/css/footer.min.css'],
    },
    JS: {
        HEADER: ['./dev/js/vendor/header.min.js', './dev/js/header.min.js'],
        FOOTER: ['./dev/js/vendor/footer.min.js', './dev/js/footer.min.js'],
    },
    IMAGES: './dev/img/',
};

const SRC = {
    FILES: [
        './src/*.*', 
        './src/**/fonts/*.*', 
        './src/**/.htaccess',
        '!./src/**/*.html', 
        // './src/**/*.php', 
        // './src/**/*.settings'
    ],
    HTML: [
        './src/**/*.html'
    ],
    FONTS: ['./src/fonts/*'],
    IMAGES: './src/img/**/*.+(ico|svg|png|jpg|gif|webp)',
};



const DEV_FONTS = ['./dev/fonts/'];

const SRC_SCSS_HEADER = ['./src/scss/header/*.scss'];
const DEV_CSS_HEADER = './dev/css/';

const SRC_SCSS_FOOTER = ['./src/scss/footer/*.scss'];
const DEV_CSS_FOOTER = './dev/css/';

const SRC_SCSS_VENDOR_HEADER = ['./src/scss/vendor/header/*.scss'];
const SRC_SCSS_VENDOR_FOOTER = ['./src/scss/vendor/footer/*.scss'];
const DEV_CSS_VENDOR = './dev/css/vendor/';

const SRC_JS_VENDOR_HEADER = './src/js/vendor/header/*.js';
const SRC_JS_VENDOR_FOOTER = './src/js/vendor/footer/*.js';
const DEV_JS_VENDOR = './dev/js/vendor/';

const SRC_JS_HEADER = './src/js/header/*.js';
const SRC_JS_FOOTER = './src/js/footer/*.js';
const DEV_JS_HEADER = './dev/js/';
const DEV_JS_FOOTER = './dev/js/';

const AUTOPREFIXER_BROWSERS = ['last 9 version', 'safari 5', 'ie 8', 'ie 9', 'ie 10', 'opera 12.1', 'ios 6', 'android 4'];
/* end config */

const gulp = require('gulp'),
    // ftp = require('vinyl-ftp'),
    // gutil = require('gulp-util'),
    bs = require('browser-sync'),
    htmlmin = require('gulp-htmlmin'),
    //clean
    clean = require('gulp-clean'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    mozjpeg = require('imagemin-mozjpeg'),
    webp = require('imagemin-webp'),
    extReplace = require("gulp-ext-replace"),
    uglify = require('gulp-uglify-es').default;

    // //images
    // responsive = require('gulp-responsive'),//https://www.npmjs.com/package/gulp-responsive
    // //uni
    // $ = require('gulp-load-plugins')();



gulp.task('clean_dev', function () {
    //сначала очистка
    return gulp.src(DEV.ROOT, { read: true, allowEmpty: true })
        .pipe(clean());
});

gulp.task('moveFiles', function () {
    return gulp.src(SRC.FILES)
        .pipe(gulp.dest(DEV.ROOT));
});

// Gulp task to minify HTML files
gulp.task('minhtml', function () {
    return gulp.src(SRC.HTML)
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(DEV.ROOT));
});

gulp.task('scss_header', function () {
    //сначала очистка
    gulp.src(DEV_CSS_HEADER+'header.min.css', { read: true, allowEmpty: true })
        .pipe(clean());

    return gulp.src(SRC_SCSS_HEADER)
        .pipe(scss())
        .pipe(autoprefixer({
            overrideBrowserslist: AUTOPREFIXER_BROWSERS,
            cascade: false,
            grid: 'autoplace',
            remove: false
        }))
        .pipe(cleanCss({ compatibility: 'ie8' })) // Минификация css
        .pipe(concat('header.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(DEV_CSS_HEADER))
        .pipe(bs.stream());
});

gulp.task('scss_footer', function () {
    //сначала очистка
    gulp.src(DEV_CSS_FOOTER+'footer.min.css', { read: true, allowEmpty: true })
        .pipe(clean());

    return gulp.src(SRC_SCSS_FOOTER, {allowEmpty: true })
        .pipe(scss())
        .pipe(autoprefixer({
            overrideBrowserslist: AUTOPREFIXER_BROWSERS,
            cascade: false,
            grid: 'autoplace',
            remove: false
        }))
        .pipe(cleanCss({ compatibility: 'ie8' })) // Минификация css 
        .pipe(concat('footer.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(DEV_CSS_FOOTER))
        .pipe(bs.stream());
});

gulp.task('scss_vendor_header', function () {
    //сначала очистка
    gulp.src(DEV_CSS_VENDOR+'header.min.css', { read: true, allowEmpty: true })
        .pipe(clean());

    return gulp.src(SRC_SCSS_VENDOR_HEADER)
        .pipe(scss())
        .pipe(autoprefixer({
            overrideBrowserslist: AUTOPREFIXER_BROWSERS,
            cascade: false,
            grid: 'autoplace',
            remove: false
        }))
        .pipe(cleanCss({ compatibility: 'ie8' })) // Минификация css 
        .pipe(concat('header.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(DEV_CSS_VENDOR))
        .pipe(bs.stream());
});

gulp.task('scss_vendor_footer', function () {
    //сначала очистка
    gulp.src(DEV_CSS_VENDOR+'footer.min.css', { read: true, allowEmpty: true })
        .pipe(clean());

    return gulp.src(SRC_SCSS_VENDOR_FOOTER, { allowEmpty: true })
        .pipe(scss())
        .pipe(autoprefixer({
            overrideBrowserslist: AUTOPREFIXER_BROWSERS,
            cascade: false,
            grid: 'autoplace',
            remove: false
        }))
        .pipe(cleanCss({ compatibility: 'ie8' })) // Минификация css 
        .pipe(concat('footer.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(DEV_CSS_VENDOR))
        .pipe(bs.stream());
});

gulp.task('js_vendor_header', function () {
    //сначала очистка
    gulp.src(DEV_JS_VENDOR+'header.min.js', { read: false, allowEmpty: true })
        .pipe(clean());

    return gulp.src(SRC_JS_VENDOR_HEADER, { allowEmpty: true })
        .pipe(concat('header.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(DEV_JS_VENDOR));
});

gulp.task('js_vendor_footer', function () {
    //сначала очистка
    gulp.src(DEV_JS_VENDOR+'footer.min.js', { read: false, allowEmpty: true })
        .pipe(clean());

    return gulp.src(SRC_JS_VENDOR_FOOTER, { allowEmpty: true })
        .pipe(concat('footer.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(DEV_JS_VENDOR));
});

gulp.task('js_header', function () {
    //сначала очистка
    gulp.src(DEV_JS_HEADER+'header.js', { read: false, allowEmpty: true })
        .pipe(clean());

    return gulp.src(SRC_JS_HEADER)
        .pipe(concat('header.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(DEV_JS_HEADER));
});

gulp.task('js_footer', function () {
    //сначала очистка
    gulp.src(DEV_JS_FOOTER+'footer.min.js', { read: false, allowEmpty: true })
        .pipe(clean());

    return gulp.src(SRC_JS_FOOTER)
        .pipe(concat('footer.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(DEV_JS_FOOTER));
});

//очистка старых изображений
// gulp.task('clean_img', function () {
//     return gulp.src(DEV.IMAGES, { read: false, allowEmpty: true })
//         .pipe(clean());
// });

gulp.task('imagemin', function () {
    return gulp.src(SRC.IMAGES)
        .pipe(imagemin([
            pngquant({ quality: [0.89, 0.91] }),
            mozjpeg({ quality: 81 })
        ]))
        .pipe(gulp.dest(DEV.IMAGES))
});


// export to webp
gulp.task("ewebp", function () {
    return gulp.src(SRC.IMAGES)
        .pipe(
            imagemin([
                webp({
                    quality: 81
                })
            ]))
        .pipe(extReplace(".webp"))
        .pipe(gulp.dest(DEV.IMAGES));
});


// Static Server + watching scss/html files
gulp.task('run_server', function (done) {
    bs.init({ // browser sync
        server: DEV.ROOT
    });
    gulp.watch(SRC_SCSS_HEADER, gulp.series('scss_header'));
    gulp.watch(SRC_SCSS_FOOTER, gulp.series('scss_footer'));
    gulp.watch(SRC_SCSS_VENDOR_HEADER, gulp.series('scss_vendor_header'));
    gulp.watch(SRC_SCSS_VENDOR_FOOTER, gulp.series('scss_vendor_footer'));
    gulp.watch(SRC_JS_VENDOR_HEADER, gulp.series('js_vendor_header'));
    gulp.watch(SRC_JS_VENDOR_FOOTER, gulp.series('js_vendor_footer'));
    gulp.watch(SRC_JS_HEADER, gulp.series('js_header'));
    gulp.watch(SRC_JS_FOOTER, gulp.series('js_footer'));
    gulp.watch(SRC.FILES, gulp.series('moveFiles'));
    done();
});

gulp.task('default', gulp.series('clean_dev', 'minhtml', 'moveFiles', 'scss_vendor_header', 'scss_vendor_footer', 'scss_header', 'scss_footer', 'js_vendor_header', 'js_vendor_footer', 'js_header', 'js_footer', 'imagemin', 'ewebp', 'run_server'));



/* PRODACTION TO DIST */
const DIST = {
    ROOT: './dist/',
    CSS: './dist/css/',
    JS: './dist/js/'
};


gulp.task('clean_dist', function () {
    //сначала очистка
    return gulp.src(DIST.ROOT, { read: true, allowEmpty: true })
        .pipe(clean());
});
// Gulp task to minify HTML files
gulp.task('move_files_dist', function () {
    return gulp.src(DEV.FILES)
        .pipe(gulp.dest(DIST.ROOT));
});


gulp.task('css_header_concat', function () {
    return gulp.src(DEV.CSS.HEADER, { allowEmpty: true })
        .pipe(concat('header.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(DIST.CSS))
        .pipe(bs.stream());
});


gulp.task('css_footer_concat', function () {
    return gulp.src(DEV.CSS.FOOTER, { allowEmpty: true })
        .pipe(concat('footer.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(DIST.CSS))
        .pipe(bs.stream());
});


gulp.task('js_header_concat', function () {
    return gulp.src(DEV.JS.HEADER, { allowEmpty: true })
        .pipe(concat('header.js'))      
        .pipe(rename({ suffix: '.min' }))
        // .pipe(uglify())
        .pipe(gulp.dest(DIST.JS));
});


gulp.task('js_footer_concat', function () {
    return gulp.src(DEV.JS.FOOTER, { allowEmpty: true })
        .pipe(concat('footer.js'))      
        .pipe(rename({ suffix: '.min' }))
        // .pipe(uglify())
        .pipe(gulp.dest(DIST.JS));
});


gulp.task('dist', gulp.series('clean_dist', 'move_files_dist', 'css_header_concat', 'css_footer_concat', 'js_header_concat', 'js_footer_concat'));