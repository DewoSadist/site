/**
 * Created by azamatkalmurzayev on 10/18/16.
 */
const path = require('path');
const argv = require('yargs').argv;
const gulp = require('gulp');
const del = require('del');
const filter = require('gulp-filter');
const git = require('gulp-git');
const exec = require('child_process').exec;
const conf = require('../conf/gulp.conf');

gulp.task('configs', configs);
gulp.task('configs-restore', configsRestore);
gulp.task('git-add-all', gitAdd);
gulp.task('git-commit', gitCommit);
gulp.task('git-checkout', checkoutBranch);
gulp.task('git-checkout-dev', checkoutDev);
gulp.task('git-pull-dev', gitPullDev);
gulp.task('git-pull', gitPullDeployBranch);
gulp.task('git-merge-dev', mergeDevToBranch);
gulp.task('git-push', gitPushToBranch);

/**
 * Heroku deployment tasks
 */

gulp.task('heroku-switch', switchToHerokuDir);
gulp.task('heroku-clear', herokuClear);
gulp.task('heroku-move-conf', herokuMoveConf);
gulp.task('heroku-move-dist', herokuMoveDist);
gulp.task('heroku-git-pull', gitPullHeroku);
gulp.task('heroku-push', gitPush);
gulp.task('heroku-deploy', gulp.series('heroku-clear', 'heroku-move-dist', 'heroku-move-conf', 'heroku-switch', 'git-add-all', 'git-commit', 'heroku-push'));

/**
 * Heroku folder initiation tasks
 */
gulp.task('heroku-git-init', gitInit);
gulp.task('heroku-git-remote', gitAddRemote);
// gulp.task('heroku-init', gulp.series('heroku-move-conf', 'heroku-clear', 'heroku-git-init', 'heroku-git-remote', 'heroku-git-pull'));
gulp.task('heroku-init', gulp.series('heroku-move-conf', 'heroku-switch', 'heroku-git-init', 'heroku-git-remote', 'git-add-all', 'git-commit', 'heroku-git-pull'));


function gitPullDev(done) {
    git.pull('origin', 'dev', {args: '--allow-unrelated-histories'}, function (err) {
        if (err) throw err;
        done();
    });
}

function gitPushToBranch(done) {
    if (argv.env) {
        git.push('origin', argv.env + '_deploy', function (err) {
            if (err) throw err;
            done();
        });
    } else {
        throw Error('no env parameter');
    }

}

function mergeDevToBranch(done) {
    git.merge('dev', function (err) {
        if (err) throw err;
        done();
    });
}

function gitPullDeployBranch(done) {
    if (argv.env) {
        git.pull('origin', argv.env + '_deploy', {args: '--allow-unrelated-histories'}, function (err) {
            if (err) throw err;
            done();
        });
    } else {
        throw Error('no env parameter');
    }
}

function checkoutBranch(done) {
    if (argv.env) {
        git.checkout(argv.env + '_deploy', function (err) {
            if (err) {
                throw err;
            }
            done();
        });
    } else {
        throw Error('no env parameter');
    }
}

function checkoutDev(done) {
    git.checkout('dev', function (err) {
        if (err) {
            throw err;
        }
        done();
    });
}

function configs(done) {
    if (argv.env) {
        gulp.src([path.join(conf.paths.config, 'env', argv.env, 'variables.json')]).pipe(gulp.dest(path.join(conf.paths.src)));
    }
    done();
}

function configsRestore(done) {
    if (argv.env) {
        gulp.src([path.join(conf.paths.config, 'env', 'default', 'variables.json')]).pipe(gulp.dest(path.join(conf.paths.src)));
    }
    done();
}
function gitPush(done) {
    git.push('heroku', 'master', function (err) {
        if (err) throw err;
        done();
    });
}

function gitCommit(done) {
    exec('git commit -m "deploy"', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        done(err);
    });
}

function switchToHerokuDir(done) {
    process.chdir('./' + conf.paths.heroku);
    done();
}

function gitAdd(done) {
    exec('git add .', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        done(err);
    });
}

function gitInit(done) {
    git.init(function (err) {
        if (err) throw err;
        done();
    });
}

function gitAddRemote(done) {
    git.addRemote('heroku', 'https://git.heroku.com/openhomebank.git', function (err) {
        if (err) throw err;
        done();
    });
}

function gitPullHeroku(done) {
    git.pull('heroku', 'master', {args: '--allow-unrelated-histories'}, function (err) {
        if (err) throw err;
        done();
    });
}

function herokuClear(done) {
    del([path.join(conf.paths.heroku, '/**/*')]);
    done();
}

function herokuMoveConf() {
    return gulp.src([path.join(conf.paths.herokuconf, '/**/*')]).pipe(gulp.dest(conf.paths.heroku));
}

function herokuMoveDist() {
    return gulp.src([path.join(conf.paths.dist, '/**/*')]).pipe(gulp.dest(path.join(conf.paths.heroku, '/public')));
}
