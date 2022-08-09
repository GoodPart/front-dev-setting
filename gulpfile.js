var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var dartSass = require("dart-sass")
var gulpSass = require("gulp-sass")
var sourcemaps = require('gulp-sourcemaps'); // 소스 파일 경로 
var autoprefixer = require("gulp-autoprefixer");
var fileinclude = require("gulp-file-include")
var spritesmith = require('gulp.spritesmith');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var replace = require('gulp-replace')

var concat = require('gulp-concat');
var del = require('del');

const sass = gulpSass(dartSass);




var PATH = {
    DEV: './',
    ROOT : './src',
    // HTML : './src/html',
    ASSETS: { 
        FONTS: './src/assets/fonts' , 
        IMAGES: './src/assets/images' , 
        STYLE: './src/assets/style' ,
        SCRIPT : './src/assets/script',
        LIB : './src/assets/lib',
        SPRITE : './src/assets/sprite_images',
        HANDLEBAR : './src/assets/handlebar/handlebar.sass.handlebars'
    },
}

var DEST_PATH = {
    ROOT: './dev',
    ASSETS: { 
        FONTS: './dev/assets/fonts' , 
        IMAGES: './dev/assets/images' , 
        STYLE: './dev/assets/style', 
        SCRIPT : './dev/assets/script',
        LIB :'./dev/assets/lib',
        SPRITE : './dev/assets/sprite_images'
    }
}
    // DEST_PATH = {
    //     HTML: './dev',
    //      ASSETS: { 
    //          FONTS: './dev/assets/fonts' , 
    //          IMAGES: './dev/assets/images' , 
    //          STYLE: './dev/assets/style', 
    //          SCRIPT : './dev/assets/script',
    //          LIB : './dev/assets/lib',
    //         } 
    //     }; 


    gulp.task('clean', () => {
        return new Promise(resolve => {
            del.sync(DEST_PATH.ROOT);
            // del.sync(PATH.DEV + './dev') ;

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
                sourceComments: false
                }; 

                gulp.src(PATH.ASSETS.STYLE + '/**/*.scss' ) 
                .pipe( sourcemaps.init()) 
                .pipe(sass(options)) 
                .pipe(autoprefixer())
                .pipe(cssmin())
                // .pipe( sourcemaps.write()) 
                // .pipe(gulp.dest( PATH.ASSETS.STYLE+ '/css'))
                .pipe(gulp.dest( DEST_PATH.ASSETS.STYLE))
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
    // 스플라이트 이미지
    gulp.task('sprite', ()=> {
        return new Promise(resolve => {

            var spriteData = gulp.src(PATH.ASSETS.SPRITE + '/*.png')
            .pipe(spritesmith({
                retinaSrcFilter: PATH.ASSETS.SPRITE +'/*@2x.png',
                imgName : 'sp_all.png',
                padding : 4,
                retinaImgName : 'sp_all2x.png',
                cssName : 'sp_all.css',
                cssTemplate : PATH.ASSETS.HANDLEBAR
            }))

            spriteData.img.pipe(gulp.dest(DEST_PATH.ASSETS.SPRITE))
            spriteData.css.pipe(gulp.dest(DEST_PATH.ASSETS.STYLE))

            resolve();
        })
    } )

    // gulp.task('compress', ()=> {
    //     return new Promise(resolve => {
    //         gulp.src(PATH.)
    //     })
    // })


    // html
    // 단지 파일을 복사하는 용도
    gulp.task('html', () => {
        return new Promise(resolve => {
            // gulp.src(PATH.ROOT + '/html/*.html')
            gulp.src([
                './src/html/*',
                './src/html/**',
                '!'+'./src/html/footer',
                '!'+'./src/html/header',
            ])
                // .pipe(gulp.dest('./src/result_html'))
                .pipe(browserSync.reload({ stream: true }));

            resolve();
        });
    })

    //script
    gulp.task('script', () => {
        return new Promise(resolve => {
            gulp.src(PATH.ASSETS.SCRIPT + '/*.js')
                // .pipe(concat('common.js'))
                .pipe(uglify())
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
                './src/html/*',
                './src/html/**',
                '!'+'./src/html/footer',
                '!'+'./src/html/header',
            ]) 
            .pipe(fileinclude({
                prefix : '@@',
                basepath : '@root'
            }))
            
            // .pipe(gulp.dest(PATH.DEV+'/dev'))
            .pipe(gulp.dest(DEST_PATH.ROOT))


            resolve();
        })
    })


    gulp.task('watch', () => {
        return new Promise( resolve => {
            gulp.watch(PATH.ASSETS.STYLE + "/**/*.scss", gulp.series(['sass']));
            gulp.watch(PATH.ROOT + "/html/**/*", gulp.series(['html', 'fileinclude']));
            gulp.watch(PATH.ASSETS.SCRIPT + "/**/*.js", gulp.series(['script']));
            gulp.watch(PATH.ASSETS.IMAGES + "/*", gulp.series(['image']));
            gulp.watch(PATH.ASSETS.SPRITE + "/*", gulp.series(['sprite']));


        resolve();
        });
    });


    
    gulp.task('browserSync', () => {
        return new Promise(resolve => {
            let bs = browserSync;

            bs.init({
                server : {
                    baseDir : DEST_PATH.ROOT,
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
    'sprite',
    'script', 
    'library',
    'browserSync', 
    'watch'
])


gulp.task( 'default', allSeries);