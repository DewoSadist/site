var gulp = require('gulp');
var server = require('gulp-server-livereload');

gulp.task('serv', function () {
    gulp.src('src')
        .pipe(server({
            livereload: true,
            directoryListing: false,
            open: false,
            port: 3000
        }));
});