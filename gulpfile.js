var gulp = require("gulp");
var indexInput = require("./indexInput.json");
var postcss = require("gulp-postcss");
var handlebars = require("gulp-compile-handlebars");
var rename = require("gulp-rename");
var merge = require("merge-stream");
var fs = require("fs");
var browserSync = require("browser-sync").create();
const htmlmin = require("gulp-htmlmin");

function build() {
    var options = {
        batch: ["./src/partials"],
        helpers: {
            capitals: function (str) {
                return str.toUpperCase();
            },
        },
    };

    var website_en = gulp
        .src("./src/index.handlebars")
        .pipe(handlebars(indexInput, options))
        .pipe(rename("index.html"))
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest("./"));

    var legalPayload = {
        general: {
            showNavItems: false,
        },
    };
    var legalnotice = gulp
        .src("./src/legalnotice.handlebars")
        .pipe(handlebars(legalPayload, options))
        .pipe(rename("legalnotice.html"))
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest("./"));

    var dataprivacy = gulp
        .src("./src/dataprivacy.handlebars")
        .pipe(handlebars(legalPayload, options))
        .pipe(rename("dataprivacy.html"))
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest("./"));

    var droppitchdeck = gulp
        .src("./src/droppitchdeck.handlebars")
        .pipe(handlebars(legalPayload, options))
        .pipe(rename("droppitchdeck.html"))
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest("./"));

    var droppitchdeckai = gulp
        .src("./src/droppitchdeckai.handlebars")
        .pipe(handlebars(legalPayload, options))
        .pipe(rename("droppitchdeckai.html"))
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest("./"));

    var portfoliotraining = gulp
        .src("./src/portfoliotraining.handlebars")
        .pipe(handlebars(legalPayload, options))
        .pipe(rename("portfoliotraining.html"))
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest("./"));

    var postCss = gulp.src("./src/*.css").pipe(postcss()).pipe(gulp.dest("./"));

    return merge(
        website_en,
        legalnotice,
        dataprivacy,
        droppitchdeck,
        droppitchdeckai,
        portfoliotraining,
        postCss,
    );
}

function reload(done) {
    browserSync.reload();
    done();
}

function serve(done) {
    browserSync.init({
        server: {
            baseDir: "./",
        },
        open: false,
    });
    done();
}

const watch = () => {
    gulp.watch(["./src/**", "./assets/**"], gulp.series(build, reload));
};

gulp.task("default", gulp.series(build, serve, watch));
gulp.task("build", build);
