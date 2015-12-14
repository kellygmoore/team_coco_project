module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            //app: {
            //    src: 'client/scripts/app.js',
            //    dest: 'server/public/assets/scripts/app.js'
            //},
            //controllers: {
            //    src: 'client/scripts/controllers/controller.js',
            //    dest: 'server/public/assets/scripts/controllers/controller.js'
            //},
            factories: {
                src: 'client/scripts/factories/*.js',
                dest: "server/public/assets/scripts/factories/data.min.js"
            }
        },
        copy: {
            //bootstrap: {
            //    expand: true,
            //    cwd: 'node_modules/bootstrap/dist/css/',
            //    src: [
            //        "bootstrap.min.css"
            //    ],
            //    "dest": "server/public/vendors/"
            //},
            angular: {
                expand: true,
                cwd: 'node_modules/angular',
                src: [
                    "angular.min.js",
                    "angular.min.js.map"
                ],
                "dest": "server/public/vendors/"
            },
            angularRoute: {
                expand: true,
                cwd: 'node_modules/angular-route',
                src: [
                    "angular-route.min.js",
                    "angular-route.min.js.map"
                ],
                "dest": "server/public/vendors/"
            },
            angularAnimate: {
                expand: true,
                cwd: 'node_modules/angular-animate',
                src: [
                    "angular-animate.min.js",
                    "angular-animate.min.js.map"
                ],
                "dest": "server/public/vendors/"
            },
            angularAria: {
                expand: true,
                cwd: 'node_modules/angular-aria',
                src: [
                    "angular-aria.min.js",
                    "angular-aria.min.js.map"
                ],
                "dest": "server/public/vendors/"
            },
            angularMaterial: {
                expand: true,
                cwd: 'node_modules/angular-material',
                src: [
                    "angular-material.min.js",
                    "angular-material.min.css,",
                    "angular-material.layouts.min.css"
                ],
                "dest": "server/public/vendors/"
            },
            angularMaterialIcons: {
                expand: true,
                cwd: 'node_modules/angular-material-icons',
                src: [
                    "angular-material-icons.min.js",
                    "angular-material-icons.css"
                ],
                "dest": "server/public/vendors/"
            },
            html: {
                expand: true,
                cwd: 'client/views/',
                src: [
                    "*",
                    "*/*"

                ],
                "dest": "server/public/assets/views/"
            },
            htmlTemplates: {
                expand: true,
                cwd: 'client/views/routes',
                src: [
                    "*.html"

                ],
                "dest": "server/public/assets/views/routes"
            },
            style: {
                expand: true,
                cwd: 'client/styles/',
                src: [
                    "*.css",
                    "*/*"
                ],
                "dest": "server/public/assets/styles/"

            },
            script: {
                expand: true,
                cwd: 'client/scripts/',
                src: [
                    "*",
                    "*/*"
                ],
                "dest": "server/public/assets/scripts/"

            },
            controller: {
                expand: true,
                cwd: 'client/scripts/controllers',
                src: [
                    "*",
                    "*/*"
                ],
                "dest": "server/public/assets/scripts/controllers"

            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    //grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['copy']);
};