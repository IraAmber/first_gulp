import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import fileinclude from 'gulp-file-include';

import cleanCss from 'gulp-clean-css'; //стиснення файлу CSS
import webpcss from 'gulp-webpcss'; // виведення WEBP зображень
import autoprefixer from 'gulp-autoprefixer'; //додавання ведорних префіксів
import groupCssMediaQueries from 'gulp-group-css-media-queries'; //групування медіа запитів

const sass = gulpSass(dartSass);


export const scss = () => {
    return app.gulp.src(app.path.src.scss, {sourcemaps: true})
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>"
        })
    ))
    .pipe(fileinclude())
    .pipe(app.plugins.replace(/@img\//g, 'img/'))
    .pipe(sass({
        outputStyle: 'expanded'
    }))
    .pipe(groupCssMediaQueries())
    .pipe(webpcss(
        {
            webClass: ".webp",
            noWebpClass: ".no-webp"

    }))
    .pipe(autoprefixer({
        grid: true,
        overriideBrowserslist: ["last 3 versions"],
        cascade: true
    }))
    .pipe(app.gulp.dest(app.path.build.css)) //початковий файл
    .pipe(cleanCss()) //стиснений файл
    .pipe(rename({
        extname: ".min.css"
    }))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
};