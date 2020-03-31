var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

/**
 * Compile css
 */
gulp.task('sass', () => gulp.src('scss/main.scss')
    .pipe(sass({
        includePaths: [
            'node_modules/coop-frontend-toolkit/styles/',
            'scss/'
        ]
    }))
    .on('error', function(err) {
        console.log(err.messageFormatted);
        this.emit('end');
    })
    .pipe(prefix({ cascade: true }))
    .pipe(gulp.dest('public/css')));

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', () => Promise.all([
    gulp.watch(
        ['scss/**/*.scss', 'scss/*.scss'],
        gulp.series('sass'),
    ),
]));

/**
 * Default task, running just `gulp` will compile
 * the sass & watch files.
 */
gulp.task('default', gulp.series('sass', 'watch'));
