// *** dependencies *** //

const path = require('path');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const runSequence = require('run-sequence');
const nodemon = require('gulp-nodemon');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const server = require('tiny-lr')();

// *** config *** //

const paths = {
  scripts: [
    path.join('src', '**', '*.js'),
    path.join('src', '*.js')
  ],
  styles: [
    path.join('src', 'client', 'css', '*.css')
  ],
  views: [
    path.join('src', 'server', '**', '*.njk'),
    path.join('src', 'server', '*.njk')
  ],
  server: path.join('src', 'server', 'server.js')
};

const lrPort = 35729;

const nodemonConfig = {
  script: paths.server,
  ext: 'html njk js css',
  ignore: ['node_modules'],
  env: {
    NODE_ENV: 'development'
  }
};

// *** default task *** //

gulp.task('default', () => {
  runSequence(
    ['lint'],
    ['lr'],
    ['nodemon'],
    ['watch']
  );
});

// *** sub tasks ** //

gulp.task('lint', () => {
  return gulp.src(paths.scripts)
    .pipe(eslint())
    .pipe(eslint.format('stylish'))
    .pipe(eslint.failAfterError());
});

gulp.task('styles', () => {
  return gulp.src(paths.styles)
    .pipe(plumber());
});

gulp.task('views', () => {
  return gulp.src(paths.views)
    .pipe(plumber());
});

gulp.task('lr', () => {
  server.listen(lrPort, (err) => {
    if (err) {
      return console.error(err);
    }
  });
});

gulp.task('nodemon', () => {
  return nodemon(nodemonConfig);
});

gulp.task('watch', () => {
  gulp.watch(paths.views, ['views']);
  gulp.watch(paths.scripts, ['lint']);
  gulp.watch(paths.styles, ['styles']);
});
