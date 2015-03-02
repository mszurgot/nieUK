module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		//łaczenie plików js w jeden o nazwie projektu z rozszerzeniem .js
		concat: {
			jstarget: {
				src: 'src/js/*.js',
				dest: 'build/js/<%= pkg.name %>.js'
			}
		},
		jshint: {
			beforeconcat: ['src/js/*.js'],
			afterconcat: ['build/js/nieUK.js'],
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true
				}
			}
		},
		//scss na css
		sass: {
			csstarget: {
				options: {                       // Target options
					style: 'expanded'
				},
				files: [{
					expand: true,
					cwd: 'src/scss',
					src: '*.scss',
					dest: 'src/css',
					ext: '.css'
				}]
			}
		},
		  //łaczenie plików css w jeden o nazwie projektu z rozszerzeniem .css
		concat_css: {
			csstarget: {
				src: 'src/css/*.css',
				dest: 'src/css/concatenated/<%= pkg.name %>.css'
			}
		},
		//minimalizacja pliku .js po konkatenacji
		uglify: {
			jstarget: {
				src: 'src/js/concatenated/<%= pkg.name %>.js',
				dest: 'build/js/<%= pkg.name %>.min.js'
			}
		},
		//minimalizacja plików .css 
		cssmin: {
			csstarget: {
				files: [{ 
					expand: true,
					cwd: 'src/css/concatenated',
					src: '<%= pkg.name %>.css',
					dest: 'build/css',
					ext: '.min.css'
				}]
			}
		},
		// minimalizacja htmla
		htmlmin: { 
			htmltarget: {
				options: {       
					removeComments: true,
					collapseWhitespace: true
				},
				files: [{                  
					expand: true,
					cwd: 'src/',    
					src: '*.html', 
					dest: 'build/'       
				}]
			}
		},
		copy: {
			main: {
				files: [{
					expand: true, 
					cwd: 'src/',
					src: ['*.html'], 
					dest: 'build/', 
					filter: 'isFile'}
				]
			}
		},
		//obserwator
		watch: {
			scripts: {
				files: ['src/js/*.js'],
				tasks: ['jshint','concat'/*,'uglify'*/],
				options: {
					spawn: false,
				}
			},
			scsses: {
				files: ['src/scss/*.scss'],
				tasks: ['sass','concat_css','cssmin'],
				options: {
					spawn: false,
				}
			},
			copy: {
				files: ['src/*.html'],
				tasks: ['copy'],
				options: {
					spawn: false,
				}
			},
			csses: {
				files: ['src/css/*.css'],
				tasks: ['concat_css','cssmin'],
				options: {
					spawn: false,
				}
			}
			
			/*htmls: {
				files: ['src/*.html'],
				tasks: 'htmlmin',
				options: {
					spawn: false,
				}
			}*/
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-concat-css');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	//grunt.loadNpmTasks('grunt-contrib-htmlmin');

  
	// Default task(s).
	//grunt.registerTask('default', ['concat','sass','concat_css','uglify','cssmin','htmlmin','watch']);
	grunt.registerTask('default', ['concat','jshint','sass','concat_css','cssmin','copy','watch']);

};