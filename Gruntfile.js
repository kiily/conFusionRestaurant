'use strict'
//use strict JS code

module.exports = function(grunt){
    //setup grunt configuration here
    //plugins for different tasks are installed and configured here; the JSON inside the
    //plugins is specific to each plugin (see official documentation for each)

    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);

    grunt.initConfig({
        //JSON object config; comma separate all tasks
        // 1. Setup Sass Tasks
        sass: {
            dist:{
                files: {
                    // : --> depends on
                    'css/styles.css':'css/styles.scss'
                }
            }
        },
        //configure watch; watch .scss files and execute the sass task if they are changed
        watch : {
            files: 'css/*.scss',
            tasks: ['sass']
        },
        //configure BrowserSync
        browserSync: {
            dev:{
                //files to watch for
                bsFiles : {
                    src:[
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options:{
                    watchTask : true,
                    server:{
                        //use current directory as base directory
                        baseDir: './'
                    }
                }
            }
        }      
    });

    //configure the sass task; task name comes first and then array of tasks to run
    grunt.registerTask('css',['sass']);
    //watch should always be last; default runs by using 'grunt' in the shell
    grunt.registerTask('default', ['browserSync', 'watch'])
}