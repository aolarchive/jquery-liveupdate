/*global module:false*/
module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    server: {
      port: 8000,
      base: '.'
    },
    pkg: grunt.file.readJSON('jquery-liveupdate.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd, h:MMTT Z") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		
    concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: false
			},
      dist: {
        src: [
          // jQuery UI
          'libs/jquery/jquery-ui*.js',
          // All AOL plugins
          'libs/aol/**/*.js',
          // Specific jQuery plugins
          'libs/jquery/jquery.ba-throttle-debounce.min.js',
          'libs/jquery/imagesloaded/jquery.imagesloaded.js',
          // All our own JavaScript files
          'src/**/*.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      },
      // no jQuery UI
      distNoUi: {
        src: [
          // All AOL plugins
          'libs/aol/**/*.js',
          // Specific jQuery plugins
          'libs/jquery/jquery.ba-throttle-debounce.min.js',
          'libs/jquery/imagesloaded/jquery.imagesloaded.js',
          // All our own JavaScript files
          'src/**/*.js'
        ],
        dest: 'dist/<%= pkg.name %>-noui.js'
      }
    },
    uglify: {
			options: {
				banner: '<%= banner %>'
			},
      bundle: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      },
      bundleNoUi: {
        src: '<%= concat.distNoUi.dest %>',
        dest: 'dist/<%= pkg.name %>-noui.min.js'
      },
      api: {
        src: ['src/liveupdateapi.js'],
        dest: 'dist/jquery.liveupdateapi.min.js'
      },
      ui: {
        src: ['src/liveupdateui.js'],
        dest: 'dist/jquery.liveupdateui.min.js'
      }
    },
    compass: {
      dev: {
        options: {
					sassDir: 'assets/scss',
					cssDir: 'assets/dev/css',
					imagesDir: 'assets/resources/images',
					debugInfo: true,
					relativeAssets: true,
					require: 'animation'
				}
      },
      prod: {
        options: {
					sassDir: 'assets/scss',
					cssDir: 'assets/prod/css',
					imagesDir: 'assets/resources/images',
					debugInfo: false,
					relativeAssets: true,
					outputStyle: 'compressed',
					noLineComments: true,
					require: 'animation'
				}
      }
    },
    watch: {
      gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			js: {
				files: '<%= jshint.js.src %>',
				tasks: ['jshint:js', 'concat:dist']
			},
			scss: {
				files: ['<%= compass.dev.options.sassDir %>/**/*.scss', 'assets/resources/*.scss'],
				tasks: ['compass:dev']
			}
    },
    jshint: {
      options: {
				jshintrc: '.jshintrc'
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			js: {
				src: 'src/**/*.js'
			}
    }
  });

  // These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'compass:dev', 'compass:prod']);

  grunt.registerTask("watch-serve", "server watch");

};
