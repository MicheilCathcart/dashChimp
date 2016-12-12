var gulp = require('gulp'),
	browserify = require("browserify"),
	tslint = require("gulp-tslint"),
	tsc = require("gulp-typescript"),
	sourcemaps = require("gulp-sourcemaps"),
	runSequence = require("run-sequence"),
	browserSync = require('browser-sync').create(),
	nodemon = require('gulp-nodemon');

gulp.task('default', function () {
	nodemon({
			script: 'app.js',
			ext: 'js css html scss',
			env: {
				PORT: 9000
			},
			ignore: ['./node_modules/**']
		})
		.on('restart', function () {
			console.log('Restarting');
		})
})