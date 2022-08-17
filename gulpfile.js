var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var merge = require('merge-stream');
var fs = require('fs');
var browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');

function build() {
    var text_en = JSON.parse(fs.readFileSync("./src/text_en.json"));
    var text_de = JSON.parse(fs.readFileSync("./src/text_de.json"));

    var options = {
        batch : ['./src/partials'],
        helpers : {
            capitals : function(str){
                return str.toUpperCase();
            }
        }
    };
 
    var website_en = gulp.src('./src/index.handlebars')
        .pipe(handlebars(text_en, options))
        .pipe(rename('index.html'))
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('./'));

    /*
    var website_de = gulp.src('./src/index.handlebars')
        .pipe(handlebars(text_de, options))
        .pipe(rename('index.html'))
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('./'));
    */

    var legalPayload = {
        general: {
            showNavItems: false
        },
        sec: {
            footer: text_en.sec.footer
        }
    };
    var legalnotice = gulp.src('./src/legalnotice.handlebars')
        .pipe(handlebars(legalPayload, options))
        .pipe(rename('legalnotice.html'))
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('./'));

    var dataprivacy = gulp.src('./src/dataprivacy.handlebars')
        .pipe(handlebars(legalPayload, options))
        .pipe(rename('dataprivacy.html'))
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('./'));

    //return merge(website_en, website_de, legalnotice, dataprivacy);
    return merge(website_en, legalnotice, dataprivacy);
};

function reload(done) {
    browserSync.reload();
    done();
}

function serve(done) {
    browserSync.init({
        server: {
            baseDir: './'
        },
        open: false
    });
    done();
}

const watch = () => {
    gulp.watch(["./src/**", "./assets/**"], gulp.series(build, reload));
}

gulp.task('default', gulp.series(build, serve, watch));
gulp.task('build', build);