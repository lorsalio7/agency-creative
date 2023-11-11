
let project_destination = "dist";
let development_folder = "app";

let path = {
  build: {
    html: project_destination + "/",
    css: project_destination + "/css/",
    js: project_destination + "/js/",
    img: project_destination + "/img/",
    fonts: project_destination + "/fonts/"
  },
  src: {
    pug: development_folder + "/pug/pages/**/*.pug",
    html: development_folder + "/*.html",
    css: development_folder + "/scss/styles.scss",
    js: development_folder + "/js/script.js",
    img: development_folder + "/img/**",
    fonts: development_folder + "/fonts/**",
    css_libs: development_folder + "/css_libs/**",
    js_libs: development_folder + "/js_libs/**"
  },
  watch: {
    pug: development_folder + "/pug/**/*.pug",
    html: development_folder + "/**/*.html",
    css: development_folder + "/scss/**/*.scss",
    js: development_folder + "/js/**/*.js",
    img: development_folder + "/img/**",
    fonts: development_folder + "/fonts/**",
    css_libs: development_folder + "/css_libs/**",
    js_libs: development_folder + "/js_libs/**"
  },
  clean: {
    html: project_destination + "/*.html",
    css: project_destination + "/css/",
    js: project_destination + "/js/",
    img: project_destination + "/img/"
  }
}

let { src, dest } = require("gulp"),
    gulp = require("gulp"),
    browsersync = require("browser-sync").create(),
    del = require("del"),
    scss = require('gulp-sass')(require('sass')),
    autoprefixer = require("gulp-autoprefixer");
    group_media = require("gulp-group-css-media-queries");
    clean_css = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify-es").default,
    pug = require("gulp-pug"),
    babel = require("gulp-babel"),
    newer = require("gulp-newer"),
    imagemin = require("gulp-imagemin"),
    webp = require("gulp-webp"),
    fs = require("fs");



function browserSync(params) {
  browsersync.init({
      server: {
          baseDir: "./" + project_destination + "/"
      },
      port: 3000,
      notify: false
  })
}

function html() {
  return src(path.src.html)
  .pipe(dest(path.build.html))
  .pipe(browsersync.stream())
}

function gulpPug() {
  return src(path.src.pug)

  .pipe(pug({
    pretty: true,
    locals: {
      pugData: JSON.parse(fs.readFileSync("app/pug/pug-data.json", "utf-8"))
    }
  }))

  .pipe(dest("./" + project_destination))
  .pipe(browsersync.stream())
}

function fonts() {
  return src(path.src.fonts)
  .pipe(dest(path.build.fonts))
  .pipe(browsersync.stream())
}
function cssLibs() {
  return src(path.src.css_libs)
  .pipe(dest(path.build.css))
  .pipe(browsersync.stream())
}
function jsLibs() {
  return src(path.src.js_libs)
  .pipe(dest(path.build.js))
  .pipe(browsersync.stream())
}

function watchFiles(params) {
  gulp.watch([path.watch.pug], gulpPug);
  gulp.watch(["app/pug/pug-data.json"], gulpPug);
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
  // gulp.watch([path.watch.fonts], fonts);
  gulp.watch([path.watch.css_libs], cssLibs);
  gulp.watch([path.watch.js_libs], jsLibs);
}

function css() {
    return src(path.src.css)
    .pipe(
      scss({
          outputStyle: "expanded"
      })
    )
    .pipe(
      group_media()
    )
    .pipe(
      autoprefixer({
        grid: true,
        overrideBrowserslist: ["last 5 versions"],
        cascade: true
      })
    )
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(
      rename({
        extname: ".min.css"
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
    .pipe(babel({
      presets: ["@babel/preset-env"]
    }))
    .pipe(dest(path.build.js))
    .pipe(
        uglify()
    )
    .pipe(
        rename({
            extname: ".min.js"
        })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function images() {
    return src(path.src.img)
    .pipe(newer(path.build.img))
    .pipe(webp({quality: 85}))
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(newer(path.build.img))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      interlaced: true,
      optimizationLevel: 2
    }))
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

function clean() {
    return del(path.clean.html, path.clean.css, path.clean.js, path.clean.img);
}

let build = gulp.series(clean, gulp.parallel(gulpPug, js, css, html, images, cssLibs, jsLibs));
let watch = gulp.parallel(build, watchFiles ,browserSync);

exports.pug = gulpPug;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
