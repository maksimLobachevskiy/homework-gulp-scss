"use strict";
const gulp = require("gulp"),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del'),
    rename = require("gulp-rename");

const { src, dest, series, parallel, watch } = require("gulp");

const path = {
    src: {
        scss: "src/scss/**/*.scss",
        js: "src/js/**/*.js",
        img: "src/img/**/*.{jpg,png,gif,svg,ico,webp}",
        html: "./index.html",
    },
    dist: {
        css: "dist/css/",
        js: "dist/js/",
        img: "dist/img/",
    },
};

const styles = () => {
    return gulp.src(path.src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist:  ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(path.dist.css))
        .pipe(browserSync.stream());
};

const scripts = () => {
    return gulp.src(path.src.js)
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest(path.dist.js))
        .pipe(browserSync.stream());
};

const images = () =>
    src(path.src.img)
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3,
            })
        )
        .pipe(dest(path.dist.img))
        .pipe(browserSync.stream());


const cleanBuild = () => {
    return del("dist/");
}

const watcher = () => {
    browserSync.init({
        server: {
            baseDir: "./",
            tunnel: true
        }
    });
    gulp.watch(path.src.js, scripts).on('change', browserSync.reload);
    gulp.watch(path.src.scss, styles).on('change', browserSync.reload);
    gulp.watch(path.src.html).on('change', browserSync.reload);
    gulp.watch(path.src.img, images).on('change', browserSync.reload);
};


exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.cleanBuild = cleanBuild;
exports.build = series(cleanBuild, parallel(styles, scripts, images));
exports.dev = watcher;