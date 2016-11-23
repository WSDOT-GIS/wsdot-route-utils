module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt)
  grunt.initConfig({
    babel: {
      default: {
        files: [{
          expand: true,
          cwd: 'es2015',
          src: '**/*.js',
          // dest: 'dist',
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
      prebuild: ['es2015', '{route-shields,wsdot-route-utils}.{js,d.ts}', 'spec/*.js', 'docs'],
      postTS: ['**/.baseDir.**', '**/spec/*.d.ts'], // grunt-ts adds unneeded junk file .baseDir.*.
      postBabel: ['es2015/**/*.d.ts', 'es2015/spec/']
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
          excludePrivate: false
        },
        src: ['./src/*.ts']
      }
    }
  })

  grunt.registerTask('default', ['clean:prebuild', 'ts', 'clean:postTS', 'babel', 'copy', 'clean:postBabel', 'typedoc'])
}
