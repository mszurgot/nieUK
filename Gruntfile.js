module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	//łaczenie plików js w jeden o nazwie projektu z rozszerzeniem .js
	 concat: {
		jstarget: {
		  src: 'src/js/*.js',
		  dest: 'src/js/concatenated/<%= pkg.name %>.js'
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
	//obserwator
	watch: {
	  scripts: {
		files: ['src/js/*.js'],
		tasks: ['concat','uglify'],
		options: {
		  spawn: false,
		}
	  }
	}
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  
  // Default task(s).
  grunt.registerTask('default', ['concat','concat_css','uglify','cssmin','htmlmin']);

};