const path = require('path');
const argv = require('yargs').argv;
const gulp = require('gulp');
const del = require('del');
const filter = require('gulp-filter');
const git = require('gulp-git');
const conf = require('../conf/gulp.conf');

gulp.task('clean', clean);
gulp.task('other', other);
gulp.task('ngdocs', ngDocs);

function ngDocs() {
    var gulpDocs = require('gulp-ngdocs');
    var options = {
        dest: 'docs',
        html5Mode: true,
        startPage: 'services/AuthService',
        title: "Homebank App - angular.js",
        inlinePartials: true,
        bestMatch: true
    };
    var sections = {
        components: {
            glob:[path.join(conf.paths.src, 'app/components/**/*')],
            title: 'Components'
        },
        services: {
            glob: [path.join(conf.paths.src, 'app/services/**/*')],
            title: 'Services'
        }
    };
    return gulpDocs.sections(sections)
        .pipe(gulpDocs.process(options))
        .pipe(gulp.dest('./docs'));
}

function clean() {
    return del([conf.paths.dist, conf.paths.tmp]);
}

function other() {
    const fileFilter = filter(file => file.stat.isFile());

    return gulp.src([
        // path.join(conf.paths.src, '/**/*'),
        conf.paths.src+'/**/*',
        // path.join(`!${conf.paths.src}`, '/**/*.{html,css,js,scss}')
        path.join(`!${conf.paths.src}`, '/**/*.{css,js,scss}')
    ])
        .pipe(fileFilter)
        .pipe(gulp.dest(conf.paths.dist));
}
