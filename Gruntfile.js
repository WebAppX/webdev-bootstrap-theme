/*!
 * TiCsw's Gruntfile
 * 
 * Copyright 2016 TiCsw research group, Uniandes
 * Copyright 2016 Jaime Chavarriaga
 */

module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
        ' * A Bootstrap theme v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
        ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed under the <%= pkg.license %> license\n' +
        ' */\n',

        // Task configuration.

        // for clean
        clean: {
            dist: 'dist'
        },

        // for less
        less: {
            compileTheme: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: '<%= pkg.name %>.css.map',
                    sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
                },
                src: 'less/webdev-theme.less',
                dest: 'dist/css/<%= pkg.name %>.css'
            }
        },

        // for css minification
        cssmin: {
            options: {
                compatibility: 'ie8',
                keepSpecialComments: '*',
                sourceMap: true,
                advanced: false
            },
            minifyTheme: {
                src: 'dist/css/<%= pkg.name %>.css',
                dest: 'dist/css/<%= pkg.name %>.min.css'
            },
        },

        // for running the server
        connect: {
            server: {
                options: {
                    open: true,
                    port: 9001,
                    // Change this to '0.0.0.0' to access the server from outside.
                    hostname: 'localhost',
                    base: '.'
                }
            },
        },

    });

    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
    require('time-grunt')(grunt);

    // CSS distribution task.
    grunt.registerTask('less-compile', ['less:compileTheme']);
    // grunt.registerTask('dist-css', ['less-compile', 'autoprefixer:core', 'autoprefixer:theme', 'csscomb:dist', 'cssmin:minifyCore', 'cssmin:minifyTheme']);

    // Serve demo task
    grunt.registerTask('serve', ['clean:dist', 'less-compile', 'cssmin:minifyTheme','connect:server:keepalive']);

    // Default task.
    grunt.registerTask('default', ['clean:dist', 'less-compile', 'cssmin:minifyTheme']);

}