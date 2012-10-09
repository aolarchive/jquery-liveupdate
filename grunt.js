/*global module:false*/
module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    server: {
      port: 8000,
      base: '.'
    },
    pkg: '<json:aol.livebloglite.jquery.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd, h:MMTT Z") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    concat: {
      dist: {
        src: ['libs/jquery/jquery-ui*.js', 'libs/aol/**/*.js', 'src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    min: {
      bundle: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      },
      api: {
        src: ['src/liveblogliteapi.js'],
        dest: 'dist/jquery.aol.liveblogliteapi.min.js'
      },
      ui: {
        src: ['src/liveblogliteui.js'],
        dest: 'dist/jquery.aol.liveblogui.min.js'
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
