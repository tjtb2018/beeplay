module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    browserify: {
      all: {
        files: {
          'dest/js/beeplay.js': 'src/**/*.js',
        }
      }
    },
    copy: {
      dest: {
        expand: true,
        flatten: true,
        src: ['src/*.js'],
        dest: 'dest/js',
      },
    },
    connect: {
      dest: {
        options: {
          hostname: '0.0.0.0',
          port: 5455,
          base: './',
          livereload: true
        }
      }
    },
    open: {
      dest: {
        path: 'http://localhost:5455/dest'
      }
    },
    jshint: {
      options: {
        browser: true,
        sub: true,
        validthis: true
      },
      all: ['Gruntfile.js', 'src/*.js']
    },
    watch: {
      all: {
        options: {
          livereload: true,
          hostname: 'localhost',
          port: 5455
        },
        files: ['src/*.js'],
        tasks: ['build'],
      }
    },
    'gh-pages': {
      options: {
        base: 'dest',
      },
      src: ['**']
    }
  });

  grunt.registerTask('build', ['browserify']);
  grunt.registerTask('server', ['connect', 'open']);
  grunt.registerTask('deploy', ['build', 'gh-pages']);

  // Main task
  grunt.registerTask('default', [
    'build', 'server', 'watch'
  ]);

  require('load-grunt-tasks')(grunt);
};
