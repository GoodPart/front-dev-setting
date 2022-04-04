var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var dartSass = require("dart-sass")
var gulpSass = require("gulp-sass")
var sourcemaps = require('gulp-sourcemaps'); // 소스 파일 경로 
var autoprefixer = require("gulp-autoprefixer");
var fileinclude = require("gulp-file-include");
var strip = require("gulp-strip-comments");
var prettier = require('gulp-prettier');
// var replace = require("gulp-replace");

var concat = require('gulp-concat');
var del = require('del');
const replace = require('gulp-replace');

const sass = gulpSass(dartSass);




var PATH = {
    ROOT : './src',
    // HTML : './src/html',
     RESOURCES: { 
         FONTS: './src/resources/fonts' , 
         IMAGES: './src/resources/images' , 
         STYLE: './src/resources/style' ,
         SCRIPT : './src/resources/script',
         LIB : './src/resources/lib',
        } 
    }, 
    DEST_PATH = {
        HTML: './dist',
         RESOURCES: { 
             FONTS: './dist/resources/fonts' , 
             IMAGES: './dist/resources/images' , 
             STYLE: './dist/resources', 
             SCRIPT : './dist/resources/script',
             LIB : './dist/resources/lib',
        } 
    },
    DEV_PATH = {
        
    }


    gulp.task('clean', () => {
        return new Promise(resolve => {
            del.sync(DEST_PATH.HTML);

            resolve()
        });
    });

    // css
    gulp.task( 'sass', () => {
            return new Promise( resolve => { 
                var options = { 
                outputStyle: "expanded" , 
                indentType: "space" ,
                indentWidth: 2  ,//space 갯수
                precision: 8 , 
                sourceComments: true
                }; 

                gulp.src(PATH.RESOURCES.STYLE + '/sass/*.scss' ) 
                .pipe( sourcemaps.init()) 
                .pipe(sass(options)) 
                .pipe(autoprefixer())
                .pipe(strip.text(
                    /* autoprefixer: ignore next */
                ))
                .pipe(prettier({
                    tabWidth: 2,
                }))
                .pipe( sourcemaps.write()) 
                .pipe(gulp.dest( PATH.RESOURCES.STYLE+ '/css'))
                .pipe(gulp.dest( DEST_PATH.RESOURCES.STYLE + '/css'))
                .pipe(browserSync.reload({ stream: true }));
            resolve(); 
        }); 
    });

    //이미지
    gulp.task('image', ()=> {
        return new Promise(resolve => {
            gulp.src([PATH.RESOURCES.IMAGES + '/*.jpg', PATH.ROOT.IMAGES + '/*.png', PATH.ROOT.IMAGES + '/*.gif'])
            .pipe(gulp.dest(DEST_PATH.RESOURCES.IMAGES))

            resolve();
        })
    } )


    // html
    // 단지 파일을 복사하는 용도
    gulp.task('html', () => {
        return new Promise(resolve => {
            gulp.src(PATH.ROOT + '/html/*.html')
                // .pipe(gulp.dest('./src/result_html'))
                .pipe(browserSync.reload({ stream: true }));

            resolve();
        });
    })

    //script
    gulp.task('script', () => {
        return new Promise(resolve => {
            gulp.src(PATH.RESOURCES.SCRIPT + '/*.js')
                // .pipe(concat('common.js'))
                .pipe(gulp.dest(DEST_PATH.RESOURCES.SCRIPT))
                .pipe(browserSync.reload({stream: true}))

         resolve();
        })
    })

    // library
    gulp.task('library', ()=> {
        return new Promise( resolve => {
            gulp.src(PATH.RESOURCES.LIB + '/**/*')
                .pipe(gulp.dest(DEST_PATH.RESOURCES.LIB))
            
                resolve();
        })
    })
    
    // fileinclude
    gulp.task('fileinclude', () => {
        return new Promise(resolve => {
            gulp.src([
                '!'+'./src/html/**/*.html',
                './src/html/*.html',
            ])
            .pipe(fileinclude({
                prefix : '@@',
                basepath : '@root'
            }))
            .pipe(gulp.dest(PATH.ROOT+'/result_html'))
            .pipe(replace(
                '<link rel="stylesheet" href="/', 
                '<link rel="stylesheet" href="../'
            ))
            .pipe(replace(
                '/style/css', 
                '/css'
            ))
            .pipe(replace(
                '<script type="text/javascript" src="/', 
                '<script type="text/javascript" src="../'
            ))
            .pipe(replace(
                '<script src="/', 
                '<script src="../'
            ))
            .pipe(gulp.dest(DEST_PATH.HTML+'/html'))


            resolve();
        })
    })


    gulp.task('watch', () => {
        return new Promise( resolve => {
            gulp.watch([PATH.RESOURCES.STYLE + "/sass/*.scss", PATH.RESOURCES.STYLE + "/sass/**/*.scss"], gulp.series(['sass']));
            gulp.watch(PATH.ROOT + "/html/*.html", gulp.series(['html', 'fileinclude']));
            gulp.watch(PATH.RESOURCES.SCRIPT + "/**/*.js", gulp.series(['script']));

        resolve();
        });
    });


    
    gulp.task('browserSync', () => {
        return new Promise(resolve => {
            let bs = browserSync;

            bs.init({
                server : {
                    baseDir : PATH.ROOT,
                    directory : true,
                },
                cors : true,
            })

            resolve()
        })
    });

var allSeries = gulp.series([
    'clean',
    'fileinclude',
    'html', 
    'sass',
    'image',
    'script', 
    'library',
    'browserSync', 
    'watch'
])


gulp.task( 'default', allSeries);