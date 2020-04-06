const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const minify = require('gulp-minify');
//Inicio funções para o sass e html
function compilarSass() {
  return gulp
    .src("css/scss/**/*.scss")
    .pipe(
      sass({
        outputStyle: "compressed"
      })
    )
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(gulp.dest("css/css-scss"))
    .pipe(browserSync.stream());
}

gulp.task("sass", function(done) {
  compilarSass();
  done();
});

function pegarsass() {
  return gulp
    .src([
      "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
      "css/css-scss/**/*.css"
    ])
    .pipe(concat("estilo.css"))
    .pipe(gulp.dest("css/"))
    .pipe(browserSync.stream());
}

gulp.task("pegarsass", pegarsass);

//Fim funções para o sass e html

//Inicio funções para o javascript

function gulpJS() {
  return gulp
    .src("js/main/*.js")
    .pipe(concat("script.js"))
    /* .pipe(
      babel({
        presets: ["@babel/env"]
      })
    ) */
    .pipe(minify())
    //.pipe(uglify())
    .pipe(gulp.dest("js/"))
    .pipe(browserSync.stream());
}

gulp.task("gulpJS", gulpJS);

function pluginsJs() {
  return gulp
    .src([
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/@fortawesome/fontawesome-free/js/all.min.js",
      "js/plugins/*.js"
    ])
    .pipe(concat("plugins.js"))
    .pipe(minify())
    .pipe(gulp.dest("js/"))
    .pipe(browserSync.stream());
}

gulp.task("pluginsjs", pluginsJs);

//Fim funções para o javascript

// Inicio função para browser-sync
function sincronizar_browser() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
}

gulp.task("browser", sincronizar_browser);

// Fim função para browser-sync

// Inicio função de watch do Gulp
function watch() {
  gulp.watch("css/scss/**/*.scss", compilarSass);
  gulp.watch("css/css-scss/**/*.css", pegarsass);
  gulp.watch("js/main/*.js", gulpJS);
  gulp.watch("js/plugins/*.js", pluginsJs);
  gulp.watch(["*.html"]).on("change", browserSync.reload);
}

gulp.task("watch", watch);
// Fim função de watch do Gulp

// Tarefa padrão do Gulp, que inicia o watch e o browser-sync
gulp.task(
  "default",
  gulp.parallel(
    "pegarsass",
    "watch",
    "browser",
    "sass",
    "gulpJS",
    "pluginsjs"
  )
);
