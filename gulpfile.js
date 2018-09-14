// Required modules.
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const csso = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const del = require('del');
const server = require('gulp-server-livereload');
const useref = require('gulp-useref');
const replace = require('gulp-replace');
const gulpSequence = require('gulp-sequence');
const iff = require('gulp-if');

// Concats all .js files including jQuery and creates maps.
gulp.task('concatjs', function() {
  return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'js/circle/autogrow.js', 'js/circle/circle.js'])
    .pipe(maps.init())
    .pipe(concat('global.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(gulp.dest('js'));
});

// Minifies .js files.
gulp.task('scripts', ['concatjs'], function() {
  return gulp.src('dist/scripts/global.js')
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest('dist/scripts'));
});

// Compiles scss into css and creates maps.
gulp.task('compileSass', function() {
  return gulp.src('sass/global.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(gulp.dest('css'));
});

// Minifies css files.
gulp.task('styles', ['compileSass'], function() {
  return gulp.src('dist/styles/global.css')
    .pipe(csso())
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('dist/styles'));
});

// compresses images and stores them into the dist/contents folder
gulp.task('images', function() {
  return gulp.src('images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/content'));
});

// Moves the index.html file and icons folder into the dist folder.
// Also replaces file path for images to the contents folder, and effectively
// does the same for .js & .css using useref.
gulp.task('move', ['scripts', 'styles'], function() {
  return gulp.src(['index.html', 'icons/*'], {base: './'})
    .pipe(iff('*.html', replace('images/','content/')))
    .pipe(iff('*.html', useref()))
    .pipe(gulp.dest('dist'));
});

// deletes the dist and css folders and the .js file inside the js folder.
gulp.task('clean', function() {
  return del(['dist', 'js/*.js*', 'css']);
});

// runs the clean task, then the scripts, styles, and images tasks in parallel,
// then the move task.
gulp.task('build', gulpSequence('clean', ['scripts', 'styles', 'images'], 'move'));

// The default task runs the build task before setting up the server and watching
// for changes to any .scss file.
gulp.task('default', ['build'], function() {
  gulp.src('dist')
    .pipe(server({
      port: 3000,
      open: true,
      livereload: true
    }))
  gulp.watch('sass/**/*.scss', ['styles']);
});
