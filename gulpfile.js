var gulp = require('gulp');

var browserSync = require("browser-sync").create();

var sass = require('gulp-sass')(require('sass'));
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var babel = require('gulp-babel');


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
            .pipe(gulp.dest('src/dev'))
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
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({stream : true}));

        resolve();
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
    browserSync.init({
        server: {
            baseDir: "./src/dev",
            directory : true
        },
        cors : true
    });

    // gulp.watch("./src/assets/style/scss/*").on('change', browserSync.reload())
    // gulp.watch(["./src/html/*.html", "./src/html/**/*.html"]).on('change', browserSync.reload())
});

gulp.task("default", gulp.series([
    'clean',
    'file-include',
    // 'html',
    'sass',
    'browser-sync',
    "watch"
]))


