'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  cleanCSS = require('gulp-clean-css');

gulp.task("concatScripts", function() {
	gulp.src(['js/jquery.js', 
			  'js/fastclick.js', 
			  'js/foundation.js', 
			  'js/foundation.equalizer.js', 
			  'js/foundation.reveal.js'])
		 .pipe(concat("app.js"))
		 .pipe(gulp.dest("js"));
});

gulp.task("concatCSS", function() {
	gulp.src(['css/basics.css',
			  'css/foundation.min.css',
			  'css/hero.css',
			  'css/menu.css',
			  'css/modals.css',
			  'css/normalize.css',
			  'css/footer.css',
			  'css/sprite.css',
			  'css/photo-grid.css'])
		.pipe(concat("main.css"))
		.pipe(gulp.dest("css"));	
});

gulp.task("minifyScripts", ["concatScripts"], function() {
	gulp.src("js/app.js")
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('js'));
});

gulp.task("minify-css", ["concatCSS"], function(){
	gulp.src("css/main.css")
		.pipe(cleanCSS())
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest('css'));	
});

gulp.task("build", ['minifyScripts', 'minify-css'], function(){
	return gulp.src(["css/main.min.css", "js/app.min.js", 'index.html', 'img/**'], { base: './'})
			   .pipe(gulp.dest('dist'));
});




  