// основні модулі
import gulp from "gulp";
//імпорті шляхів
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

//передаємо значення в глобальну змінну
global.app = {
    path: path,
    gulp: gulp,
    plugins: plugins
};

//імпорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWofff, fontsStyle } from "./gulp/tasks/fonts.js";

//спостерігач за змінами в файлах
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

const fonts = gulp.series(otfToTtf, ttfToWofff, fontsStyle);

//основні задачі
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

// побудова сценаріїв виконання задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

//виконання сценарію за замовчуванням
gulp.task('default', dev);
