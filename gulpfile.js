var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync');
var plumber     = require('gulp-plumber');
var reload      = browserSync.reload;

var paths = {
  html:['index.html'],
  css:['css/style.css'],
  sass:['sass/*.sass']
};

////////////////////////////////////////////////
// HTML 
// ///////////////////////////////////////////////
gulp.task('html', function(){
  gulp.src(paths.html)
  .pipe(reload({stream:true}));
});

// ////////////////////////////
// Sass
// ////////////////////////////
gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('sass/*.sass') // Берем источник
        .pipe(plumber())
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('css/')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})); // Обновляем CSS на странице при изменении
});

//////////////////////////////
// Browser-sync
//////////////////////////////
gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: './' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('watch', ['browser-sync', 'sass', 'html'], function() {
    gulp.watch('sass/*.sass', ['sass']); // Наблюдение за sass файлами
    gulp.watch('index.html', ['html']);// Наблюдение за другими типами файлов
});

gulp.task('default', ['watch', 'browserSync']);