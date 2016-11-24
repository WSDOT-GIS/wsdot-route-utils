module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt)
  grunt.initConfig({
    babel: {
      default: {
        files: [{
          expand: true,
          cwd: 'es2015',
          src: '**/*.js',
          ext: '.js'
        }]
      }
    },
    copy: {
      default: {
        files: [
          {
            expand: true,
            cwd: 'es2015',
            src: '**/*.d.ts',
            ext: '.d.ts'
          }
        ]
      }
    },
    clean: {
      docs: ['docs'],
      prebuild: ['es2015', '{route-shields,wsdot-route-utils}.{js,d.ts}', 'spec/*.js', 'docs'],
      postTS: ['**/.baseDir.**', '**/spec/*.d.ts'], // grunt-ts adds unneeded junk file .baseDir.*.
      postBabel: ['es2015/**/*.d.ts', 'es2015/spec/']
    },
    jasmine: {
      default: {
        src: ['route-shields.js', 'wsdot-route-utils.js'],
        options: {
          specs: ['spec/*Spec.js'],
          polyfills: ['node_modules/babel-polyfill/dist/polyfill.js']
        }
      }
    },
    jasmine_nodejs: {
      default: {
        specs: [
          'spec/**'
        ]
      }
    },
    ts: {
      default: {
        tsconfig: true
      }
    },
    typedoc: {
      build: {
        options: {
          out: './docs',
          name: 'WSDOT Route Utilities',
          theme: 'minimal',
          excludePrivate: true
        },
        src: ['./src/*.ts']
      }
    },
    concurrent: {
      build: [['clean:prebuild', 'ts', 'clean:postTS', 'babel', 'copy', 'clean:postBabel'], 'typedoc'],
      test: ['jasmine', 'jasmine_nodejs']
    }
  })

  grunt.registerTask('default', ['concurrent:build'])
  grunt.registerTask('makedocs', ['clean:docs', 'typedoc'])
  grunt.registerTask('test', ['concurrent:test'])
}
