var dest = require('gulp-dest');
const gulp = require('gulp');
//const phpMinify = require('@aquafadas/gulp-php-minify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var pump = require('pump');
var htmlmin = require('gulp-htmlmin');
var babel = require('gulp-babel')
 
// gulp.task('minify:php', () => gulp.src('params/plug.php', {read: false})
//   .pipe(phpMinify())
//   .pipe(gulp.dest('params/plug.job.php'))
// );

// gulp.task('chart', function (cb) {
//   pump([
//         gulp.src('js/chart.js'),
//         uglify(),
// 	rename('chart.job.js'),
//         gulp.dest('public/js/')
//     ],
//     cb
//   );
// });

gulp.task('index-minify', function() {
  return gulp.src('index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('public/'));
});

gulp.task('vue', function (cb) {
    pump([
            gulp.src('src/components/*.vue'),
            //babel({presets: ['es2015']}),
            htmlmin({collapseWhitespace: true}),
            gulp.dest('public/src/components/')
        ],
        cb
    );
});

gulp.task('app', function (cb) {
  pump([
        gulp.src('js/app.js'),
	babel({presets: ['es2015']}),
        uglify({ compress: true }),
	rename('app.js'),
	gulp.dest('public/js/')
    ],
    cb
  );
});

gulp.task('public', ['index-minify','app','vue']);