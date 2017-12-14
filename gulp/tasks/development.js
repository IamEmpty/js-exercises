import gulp from 'gulp';
import { development } from '../config';
import gulpLoadPlugins from 'gulp-load-plugins';
const plugins = gulpLoadPlugins();
import browserSync from 'browser-sync';

// Get one .less file and render
const css = () =>
  gulp.src(development.less)
    .pipe(plugins.plumber())
    .pipe(plugins.rename('main.css'))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.less({
      compress: false
    }))
    .pipe(plugins.sourcemaps.write(''))
    .pipe(gulp.dest(development.dest));

const html = () =>
  gulp.src(development.pug)
    .pipe(plugins.plumber())
    .pipe(plugins.pug({
      pretty: true
    }))
    .pipe(plugins.rename('index.html'))
    .pipe(gulp.dest(development.dest));

const js = () =>
  gulp.src(development.js)
    .pipe(plugins.plumber())
    .pipe(gulp.dest(development.dest));

// Rerun the task when a file changes
const watch = () => {
  gulp.watch(development.lessWatch, css);
  gulp.watch(development.pug, html);
  gulp.watch(development.js, js);
};

// Static server
const serve = () => {
  browserSync.init({
    server: {
      baseDir: development.dev,
      index: 'index.html'
    },
    browser: ['google chrome', 'chrome']
  });
};

const develop = gulp.series(gulp.parallel(css, html, js), watch, serve);
export default develop;
