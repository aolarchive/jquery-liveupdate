/*global module:false*/
module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    server: {
      port: 8000,
      base: '.'
    },
    pkg: '<json:jquery-liveupdate.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd, h:MMTT Z") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    concat: {
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
    min: {
      bundle: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      },
      bundleNoUi: {
        src: ['<banner:meta.banner>', '<config:concat.distNoUi.dest>'],
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
    qunit: {
      files: ['test/**/*.html']
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
    },
    compass: {
      dev: {
        src: 'assets/scss',
        dest: 'assets/dev/css',
        linecomments: true,
        forcecompile: true,
        debugsass: true,
        relativeassets: true,
        images: 'assets/resources/images',
        require: 'animation'
      },
      prod: {
        src: 'assets/scss',
        dest: 'assets/prod/css',
        outputstyle: 'compressed',
        linecomments: false,
        forcecompile: true,
        debugsass: false,
        relativeassets: true,
        images: 'assets/resources/images',
        require: 'animation'
      }
    },
    watch: {
      files: ['<config:lint.files>', 'assets/scss/*.scss', 'assets/resources/*.scss'],
      tasks: 'default'
    },
    jshint: {
      // Specifying a jshint file will be possible in Grunt soon
      options: {
        "curly": true,
        "eqeqeq": true,
        "immed": true,
        "latedef": true,
        "newcap": true,
        "noarg": true,
        "sub": true,
        "undef": true,
        "boss": true,
        "eqnull": true,
        "browser": true,
        "white": true,
        "devel": true,
        "indent": 2,
        "jquery": true,
        "predef": "twttr"
      },
      globals: {
        jQuery: true,
        twttr: true
      }
    },
    uglify: {}
  });

  grunt.loadNpmTasks('grunt-compass');

  // Default task.
  grunt.registerTask('default', 'lint qunit concat min compass:dev compass:prod');

  grunt.registerTask("watch-serve", "server watch");

};
