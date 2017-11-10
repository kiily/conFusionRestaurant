'use strict'
//use strict JS code

module.exports = function (grunt) {
    //setup grunt configuration here
    //plugins for different tasks are installed and configured here; the JSON inside the
    //plugins is specific to each plugin (see official documentation for each)

    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    grunt.initConfig({
        //JSON object config; comma separate all tasks
        // 1. Setup Sass Tasks
        sass: {
            dist: {
                files: {
                    // : --> depends on
                    'css/styles.css': 'css/styles.scss'
                }
            }
        },
        //configure watch; watch .scss files and execute the sass task if they are changed
        watch: {
            files: 'css/*.scss',
            tasks: ['sass']
        },
        //configure BrowserSync
        browserSync: {
            dev: {
                //files to watch for
                bsFiles: {
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        //use current directory as base directory
                        baseDir: './'
                    }
                },
            }
        },
        //copy files task; cwd --> current working directory
        //dest --> destination folder
        copy: {
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },
            fonts: {
                files: [{
                    //enable dynamic expansion
                    expand: true,
                    dot: true,
                    cwd: 'node_modules/font-awesome',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }]
            }
        },
        //clean task
        clean: {
            build: {
                src: ['dist/*']
            }
        },
        //image minification and compression
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: ['img/*.{png,gif,jpg}'],
                    dest: 'dist/'
                }]
            }
        },
        //usemin needs to be prepared before use
        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['contactus.html', 'aboutus.html', 'index.html']
            },
            options: {
                //configuration found by trial and error
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        //supply options to subtasks
                        css: [{
                            name: 'cssmin',
                            createConfig: function (context, block) {
                                //specify JS object with options property to be passed to cssmin task by usemin
                                //this avoids font awesome breaking
                                var generated = context.options.generated;
                                generated.option = {
                                    keepSpecialComments: 0,
                                    rebase: false
                                }
                            }
                        }]
                    }
                }
            }
        },
        //note how everything below here is done directly on the dist folder
        //concatenation;
        concat: {
            options: {
                separator: ';'
            },
            //dist configuration is provided in usemin
            dist: {}
        },
        //uglify
        uglify: {
            dist: {}
        },
        //css minification
        cssmin: {
            dist: {}
        },
        //filerev (file revision) -- when usemin prepares main.css and main.js files it adds an additional extension to the main name
        //when we make a new version we can avoid cached pages to be reloaded; the css and js will have a numeric extension
        filerev: {
            options: {
                encoding: 'utf-8',
                algorithm: 'md5',
                length: 20
            },
            //specify the files on which filerev should act
            release: {
                files: [{
                    src: [
                        'dist/css/*.css',
                        'dist/js/*.js'
                    ]
                }]
            }
        },
        //configure the usemin task
        usemin: {
            html: ['dist/contactus.html', 'dist/aboutus.html', 'dist/index.html'],
            options: {
                //specify assets directory
                assetsDir: ['dist', 'dist/css', 'dist/js']
            }
        }


    });

    //configure the sass task; task name comes first and then array of tasks to run
    grunt.registerTask('css', ['sass']);
    grunt.registerTask('clean', ['clean']);
    //watch should always be last; default runs by using 'grunt' in the shell
    grunt.registerTask('default', ['browserSync', 'watch'])

    //specify tasks in the right sequence
    grunt.registerTask('build', [
        // 'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin'
    ]);
}