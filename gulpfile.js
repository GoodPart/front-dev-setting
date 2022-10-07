var gulp = require('gulp');
var replace = require("gulp-replace")

var browserSync = require("browser-sync").create();

var sass = require('gulp-sass')(require('sass'));
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var sourcemaps = require("gulp-sourcemaps");


//webpack
var webpack = require("webpack-stream");


// function
var clean = require('gulp-clean');
const fileinclude = require('gulp-file-include');

gulp.task("clean", () => {
    return gulp.src(['./dist', 'src/dev'], {allowEmpty : true})
            .pipe(clean())
})

gulp.task("html", ()=> {
    return new Promise(resolve=> {
        gulp.src("./src/html/result-html/*")
            .pipe(gulp.dest('./dist'))
        resolve()

    })
})



gulp.task('file-include', ()=> {
    return new Promise(resolve=> {
        gulp.src([
            "src/html/**/*.html",
            "!src/html/result-html",
            "!src/html/include/*.html"
        ])
            .pipe(fileinclude({
                prefix : '@@',
                basepath : '@file'
            }))
            .pipe(gulp.dest('dev'))
            .pipe(browserSync.reload({stream : true}));
        resolve()
    })
})

gulp.task('sass', ()=> {
    return new Promise( resolve => {

        gulp.src('./src/assets/style/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dev/assets/style/css'))
        .pipe(browserSync.reload({stream : true}));

        resolve();
    })
})

gulp.task('script', ()=> {
    return new Promise(resolve=> {
        gulp.src('src/assets/script/*.js')
            .pipe(webpack(require('./webpack.config.js')))
            .pipe(gulp.dest('dev/assets/script'))
            
        resolve()
    })
})


// build 
gulp.task('exported', ()=> {
    return new Promise(resolve=> {
        gulp.src([
            'dev/**/*.html'
            // '!dev/assets'
        ])
        .pipe(replace(
            '<link rel="stylesheet" href="../../assets/style/css/',
            '<link rel="stylesheet" href="../assets/style/css/',
        ))
        .pipe(gulp.dest('dev'))

        resolve()
    })
})

gulp.task("watch", ()=> {
    return new Promise(resolve=> {
        gulp.watch("src/html/**/*", gulp.series(['file-include']))
        gulp.watch("src/assets/style/**/*", gulp.series(['sass']))
        
        resolve()
    })
})

gulp.task('browser-sync', function() {
    return new Promise(resolve => {
        let bs = browserSync;

        bs.init({
            server : {
                baseDir : "dev",
                directory : true,
            },
            cors : true,
        })
        resolve()
    })
});

gulp.task("default", gulp.series([
    'clean',
    'file-include',
    // 'html',
    'sass',
    'script',
    'browser-sync',
    "watch"
]))