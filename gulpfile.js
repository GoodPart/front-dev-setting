var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var dartSass = require("dart-sass")
var gulpSass = require("gulp-sass")
var sourcemaps = require('gulp-sourcemaps'); // 소스 파일 경로 
var autoprefixer = require("gulp-autoprefixer");
var fileinclude = require("gulp-file-include")

var concat = require('gulp-concat');
var del = require('del');

const sass = gulpSass(dartSass);




var PATH = {
    ROOT : './src',
    // HTML : './src/html',
     ASSETS: { 
         FONTS: './src/assets/fonts' , 
         IMAGES: './src/assets/images' , 
         STYLE: './src/assets/style' ,
         SCRIPT : './src/assets/script',
         LIB : './src/assets/lib',
        } 
    }, 
    DEST_PATH = {
        HTML: './dist',
         ASSETS: { 
             FONTS: './dist/assets/fonts' , 
             IMAGES: './dist/assets/images' , 
             STYLE: './dist/assets/style', 
             SCRIPT : './dist/assets/script',
             LIB : './dist/assets/lib',
            } 
        }; 


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
                indentWidth: 4  ,
                precision: 8 , 
                sourceComments: true
                }; 

                gulp.src(PATH.ASSETS.STYLE + '/**/*.scss' ) 
                .pipe( sourcemaps.init()) 
                .pipe(sass(options)) 
                .pipe(autoprefixer())
                .pipe( sourcemaps.write()) 
                .pipe(gulp.dest( PATH.ASSETS.STYLE+ '/css'))
                .pipe(gulp.dest( DEST_PATH.ASSETS.STYLE + '/css'))
                .pipe(browserSync.reload({ stream: true }));
            resolve(); 
        }); 
    });

    //이미지
    gulp.task('image', ()=> {
        return new Promise(resolve => {
            gulp.src([PATH.ASSETS.IMAGES + '/*.jpg', PATH.ROOT.IMAGES + '/*.png', PATH.ROOT.IMAGES + '/*.gif'])
            .pipe(gulp.dest(DEST_PATH.ASSETS.IMAGES))

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
            gulp.src(PATH.ASSETS.SCRIPT + '/*.js')
                .pipe(concat('common.js'))
                .pipe(gulp.dest(DEST_PATH.ASSETS.SCRIPT))
                .pipe(browserSync.reload({stream: true}))

         resolve();
        })
    })

    // library
    gulp.task('library', ()=> {
        return new Promise( resolve => {
            gulp.src(PATH.ASSETS.LIB + '/*.js')
                .pipe(gulp.dest(DEST_PATH.ASSETS.LIB))
            
                resolve();
        })
    })
    
    // fileinclude
    gulp.task('fileinclude', () => {
        return new Promise(resolve => {
            gulp.src([
                '!'+'./src/html/**/*.html',
                './src/html/index.html',
            ])
            .pipe(fileinclude({
                prefix : '@@',
                basepath : '@root'
            }))
            .pipe(gulp.dest(PATH.ROOT+'/result_html'))
            .pipe(gulp.dest(DEST_PATH.HTML+'/html'))


            resolve();
        })
    })


    gulp.task('watch', () => {
        return new Promise( resolve => {
            gulp.watch(PATH.ASSETS.STYLE + "/*.scss", gulp.series(['sass']));
            gulp.watch(PATH.ROOT + "/html/*.html", gulp.series(['html', 'fileinclude']));
            gulp.watch(PATH.ASSETS.SCRIPT + "/**/*.js", gulp.series(['script']));

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