var gulp = require('gulp'),
nodemon = require('gulp-nodemon');

gulp.task('default', function(){
	nodemon({
		script: 'app.js',
		ext: 'js css html scss',
		env: {
			PORT:9000 
		},
		ignore:['./node_modules/**']
	})
	.on('restart', function(){
		console.log('Restarting');
	})
})

