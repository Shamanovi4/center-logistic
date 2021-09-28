let gulp = require('gulp'),
	sass = require('gulp-sass'),
  pug = require('gulp-pug'),
  browserSync = require('browser-sync'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  del = require('del'),
  autoprefixer = require('gulp-autoprefixer')

gulp.task('clean', async function () {
  del.sync('dist')
})

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "src/"
      }
  });
});

gulp.task('scss', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false,
      })
    )
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('css', function () {
  return gulp.src([
      'node_modules/normalize.css/normalize.css',
      'node_modules/slick-carousel/slick/slick.css',
    ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('src/scss'))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('pug', function () {
  return gulp.src('src/*.pug')
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest('src'))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('script', function () {
  return gulp.src('src/js/*.js')
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('js', function () {
  return gulp.src(['node_modules/slick-carousel/slick/slick.js'])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('export', function () {
  let buildHtml = gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'))

  let BuildCss = gulp.src('src/css/**/*.css')
    .pipe(gulp.dest('dist/css'))

  let BuildJs = gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('dist/js'))

  let BuildFonts = gulp.src('src/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'))

  let BuildImg = gulp.src('src/images/**/*.*')
    .pipe(gulp.dest('dist/images'))
})

gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', gulp.parallel('scss'))
  gulp.watch('src/*.pug', gulp.parallel('pug'))
  gulp.watch('src/js/*.js', gulp.parallel('script'))
})

gulp.task('build', gulp.series('clean', 'export'))

gulp.task('default', gulp.parallel('scss', 'css', 'pug', 'js', 'browser-sync', 'watch'))
