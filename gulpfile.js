"use strict";
const gulp = require("gulp"),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del');

const path = {
    src: {
        scss: "./src/scss/style.scss",
        js: "./src/js/script.js",
        img: "./src/img/**/*.{jpg,png,gif,svg,ico,webp}",
    },
    dist: {
        css: ".dist/css/",
        js: ".dist/js/",
        img: ".dist/img/",
    },
};

const scss = () => {

}




