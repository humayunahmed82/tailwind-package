import gulp from "gulp";
import browserSync from "browser-sync";
import concat from "gulp-concat";
import sass from "gulp-sass";
import dartSass from "sass";
import autoprefixer from "gulp-autoprefixer";
import fileInclude from "gulp-file-include";
import beautifyCode from "gulp-beautify-code";
import cssnano from "gulp-cssnano";
import imagemin from "gulp-imagemin";
import postcss from "gulp-postcss";
import tailwindcss from "tailwindcss";

const sassCompiler = sass(dartSass);
const server = browserSync.create();

// Source Folder Locations
const src = {
    root: "./src/",
    html: "./src/html/*.html",
    partials: "./src/partials/",
    css: "./src/assets/css/**/*",
    fonts: "./src/assets/fonts/**/*",
    scss: "./src/assets/scss/**/*",
    js: "./src/assets/js/**/*",
    images: "./src/assets/images/**/*",
};

// Destination Folder Locations
const dest = {
    root: "./dest/",
    css: "./dest/assets/css",
    fonts: "./dest/assets/fonts/",
    images: "./dest/assets/images/",
    js: "./dest/assets/js",
    scss: "./dest/assets/scss/",
};

// Live Synchronization & Reload

function liveBrowserSync(done) {
    server.init({ server: { baseDir: dest.root } });
    done();
}
function reload(done) {
    server.reload();
    done();
}

// HTML Task (Compile with Partial)
function htmlTask() {
    return gulp
        .src(src.html)
        .pipe(fileInclude({ basepath: src.partials }))
        .pipe(beautifyCode())
        .pipe(gulp.dest(dest.root));
}

// Copy Task
function copyTask(folder) {
    return gulp
        .src(`./src/assets/${folder}/**/*`)
        .pipe(gulp.dest(`./dest/assets/${folder}`));
}

gulp.task("css", () => copyTask("css"));
gulp.task("fonts", () => copyTask("fonts"));
gulp.task("js", () => copyTask("js"));
gulp.task("scss", () => copyTask("scss"));

// Style Task with Tailwind CSS
function styleTask() {
    return gulp
        .src("./src/assets/scss/style.scss")
        .pipe(sassCompiler().on("error", sassCompiler.logError))
        .pipe(postcss([tailwindcss, autoprefixer]))
        .pipe(concat("style.css"))
        .pipe(gulp.dest(dest.css))
        .pipe(concat("style.min.css"))
        .pipe(postcss([tailwindcss, autoprefixer]))
        .pipe(cssnano())
        .pipe(gulp.dest(dest.css))
        .pipe(browserSync.stream());
}

// Image Optimization, SVG & GIF Copy
function imagesTask() {
    return gulp
        .src([
            "./src/assets/images/**/*.png",
            "./src/assets/images/**/*.jpg",
            "./src/assets/images/**/*.jpeg",
            "./src/assets/images/**/*.webp",
        ])
        .pipe(imagemin())
        .pipe(gulp.dest(dest.images));
}

function svgGifTask() {
    return gulp
        .src(["./src/assets/images/**/*.svg", "./src/assets/images/**/*.gif"])
        .pipe(gulp.dest(dest.images));
}

// Watch Files
function watchFiles() {
    gulp.watch(
        [src.html, src.partials, src.scss],
        gulp.series(styleTask, htmlTask, reload)
    );
    gulp.watch(src.css, gulp.series("css", htmlTask, reload));
    gulp.watch(src.fonts, gulp.series("fonts", htmlTask, reload));
    gulp.watch(src.js, gulp.series("js", htmlTask, reload));
    gulp.watch(
        src.images,
        gulp.series(imagesTask, svgGifTask, htmlTask, reload)
    );
    gulp.watch(src.scss, gulp.series(styleTask, htmlTask, reload));
}

// Default Task
gulp.task(
    "defaultTask",
    gulp.series(
        htmlTask,
        "css",
        "fonts",
        "js",
        "scss",
        styleTask,
        imagesTask,
        svgGifTask
    )
);

// Default
gulp.task(
    "default",
    gulp.series("defaultTask", gulp.parallel(liveBrowserSync, watchFiles))
);
