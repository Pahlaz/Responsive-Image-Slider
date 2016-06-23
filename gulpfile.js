// Requiring nodes.
var gulp = require('gulp'),
		browserSync = require('browser-sync'),
		sass = require('gulp-ruby-sass'),
		uglify = require('gulp-uglify'),
		imagemin = require('gulp-imagemin');

// For checking ERRORS in SASS and JS while compiling and minifying.
function errorLog(error){
	console.error.bind(error);
	this.emit('end');
}

// Default Task.
gulp.task('default', ['server', 'watch']);

// Initializing the SERVER for live reloading.
gulp.task('server', function(){
	browserSync.init({
		server: {
			baseDir: 'app'
		}
	});
});

// Watching for changes in HTML, SASS and JS.
gulp.task('watch', function(){
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/assets/sass/**/*.sass', ['compileSass']);
	gulp.watch('app/assets/js/*.js', ['minifyJS']);
});

// For COMPILING SASS.
gulp.task('compileSass', function(){
	return sass('app/assets/sass/**/*.sass', {
				style: 'compressed'
			})
			.on('error', errorLog)
			.pipe(gulp.dest('app/assets/css/'))
			.pipe(browserSync.reload({stream: true}));
});

// For MINIFYING JS.
gulp.task('minifyJS', function(){
	gulp.src('app/assets/js/*.js')
			.pipe(uglify())
			.on('error', errorLog)
			.pipe(gulp.dest('app/assets/js/min/'))
			.pipe(browserSync.reload({stream: true}));
});

// IMAGE MINIFY.
gulp.task('imagemin', function(){
	gulp.src('app/assets/img/*')
			.pipe(imagemin())
			.pipe(gulp.dest('app/assets/img/min/'));
});
