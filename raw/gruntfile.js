module.exports = function(grunt) {

  grunt.initConfig({
    // https://www.npmjs.com/package/grunt-ngdocs
    ngdocs: {
        all: ['project/js/*.js'],
      options: {
        dest: '../docs',
        html5Mode: true
      }
    },

    // \node_modules\grunt-contrib-copy\README.md
    copy: {
      common: {
        files:[          
          {expand: true, cwd: 'libs/angular/', src: ['angular.js'], dest: '../build/js'},
          {expand: true, cwd: 'project/images/', src: ['**'], dest: '../build/img'},
        ]
      },
      html: {
          files: [
          {expand: true, cwd: 'project/html/', src: ['*.html'], dest: '../build/'}
        ]
      }
    },

    // node_modules\grunt-contrib-uglify\README.md
    uglify: {
      beautyJs: {
        options: {
          mangle: false,
          beautify: true
        },
        files: {'../build/js/main.js':['project/js/functions.js','project/js/main.js']}
      }
    },

    // node_modules\grunt-contrib-less\README.md
    less: {
      main: {
        files: {
          "../build/css/main.css": ["project/styles/page.less", "project/styles/message.less", "project/styles/animation.less"]
        }
      }
    },

    // node_modules\grunt-karma\README.md
    karma: {
      unit: {
        configFile: 'project/tests/karma.conf.js'
      }
    },

    // node_modules\grunt-contrib-watch\README.md
    watch: {
      js: {
        files: ['project/js/*.js'],
        tasks: ['uglify:beautyJs']
      },
      html: {
        files: ['project/html/*.html'],
        tasks: ['copy:html']
      },
      css: {
        files: ['project/styles/*.less'],
        tasks: ['less']
      },
      utest: {
        files: ['../build/js/main.js', 'project/tests/tests.js']
      }
    }

  });

  grunt.loadNpmTasks('grunt-ngdocs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-jasmine');

  grunt.registerTask('_watcher', ['watch']);
  grunt.registerTask('default', ['ngdocs','copy','uglify','less','karma', '_watcher']);
};