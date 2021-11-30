var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var merge = require('merge-stream');
var browserSync = require('browser-sync').create();

var text_en = require("./src/text_en.json");
var text_de = require("./src/text_de.json");

function scripts() {
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
        .pipe(gulp.dest('./en'));

    var website_de = gulp.src('./src/index.handlebars')
        .pipe(handlebars(text_de, options))
        .pipe(rename('website.html'))
        .pipe(gulp.dest('./'));

    var legalPayload = {
        general: {
            showNavItems: false
        },
        sec: {
            footer: text_en.sec.footer
        }
    };
    var imprint = gulp.src('./src/imprint.handlebars')
        .pipe(handlebars(legalPayload, options))
        .pipe(rename('imprint.html'))
        .pipe(gulp.dest('./'));

    var dataprivacy = gulp.src('./src/dataprivacy.handlebars')
        .pipe(handlebars(legalPayload, options))
        .pipe(rename('dataprivacy.html'))
        .pipe(gulp.dest('./'));

    return merge(website_en, website_de, imprint, dataprivacy);
};

function reload(done) {
    browserSync.reload();
    done();
  }
  
function serve(done) {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    done();
}

const watch = () => gulp.watch(["src/*", "assets/*"], gulp.series(scripts, reload));

const dev = gulp.series(scripts, serve, watch);



gulp.task('default', ['dev']);