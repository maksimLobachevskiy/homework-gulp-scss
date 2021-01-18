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
        scss: "./src/scss/style.scss",
        js: "./src/js/script.js",
        img: "./src/img/**/*.{jpg,png,gif,svg,ico,webp}",
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
        .pipe(uglify())
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest(path.dist.js));
};

const cleanBuild = () => {
    return del("dist/");
}

const watcher = () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(path.src.scss, styles).on('change', browserSync.reload);
    gulp.watch(path.src.html).on('change', browserSync.reload);
};


exports.styles = styles;
exports.scripts = scripts;
exports.cleanBuild = cleanBuild;
exports.build = series(cleanBuild, parallel(styles, scripts));
exports.dev = watcher;