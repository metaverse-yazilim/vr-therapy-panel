angular.module('vrTheraphy')
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$httpProvider', 'IdleProvider', '$locationProvider', 
        function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $httpProvider, IdleProvider, $locationProvider) {
            //$locationProvider.html5Mode(true)
            $locationProvider.hashPrefix('');
            IdleProvider.idle(5);
            IdleProvider.timeout(120);

            $urlRouterProvider
                .otherwise('/login');

            $stateProvider
                .state('login', {
                    url: "/login",
                    templateUrl: "Views/login.html",
                    controller: 'login_controller',
                    data: { pageTitle: 'Sign In' },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/login_controller.js',
                                'Scripts/Service/login.js'
                            ]);
                        }]
                    },
                    //onExit: [function () {
                    //        alert("exit user");//do what u want to do here
                    //}]
                })



                .state('register', {
                    url: "/register",
                    templateUrl: "Views/register.html",
                    controller: 'register_controller',
                    data: { pageTitle: 'Sign Up' },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/register_controller.js',
                                'Scripts/Service/register.js'
                            ]);
                        }]
                    }
                })

                .state('patregister', {
                    url: "/patregister",
                    templateUrl: "Views/patregister.html",
                    controller: 'patregister_controller',
                    data: { pageTitle: 'Sign Up a Patient' },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/patregister_controller.js',
                                'Scripts/Service/register.js'
                            ]);
                        }]
                    }
                })


                .state('loggedin', {
                    url: "/loggedin",
                    templateUrl: "Views/loggedin.html",
                    controller: 'loggedin_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/loggedin_controller.js',
                                'Scripts/Service/login.js'
                            ]);
                        }]
                    }
                })

                .state('newsession', {
                    url: "/newsession",
                    templateUrl: "Views/newsession.html",
                    controller: 'newsession_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/newsession_controller.js',
                                'Scripts/Service/login.js'
                            ]);
                        }]
                    }
                })

                .state('sessionedit', {
                    url: "/sessionedit",
                    templateUrl: "Views/sessionedit.html",
                    controller: 'sessionedit_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/sessionedit_controller.js',
                                'Scripts/Service/login.js'
                            ]);
                        }]
                    }
                })

                .state('calendar', {
                    url: "/calendar",
                    templateUrl: "Views/calendar.html",
                    controller: 'calendar_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/calendar_controller.js',
                                'Scripts/Service/login.js'
                            ]);
                        }]
                    }
                })

                //.state('patientinfo', {
                //    url: "/patientinfo",
                //    templateUrl: "Views/patientinfo.html",
                //    controller: 'patientinfo_controller',
                //    resolve: {
                //        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                //            return $ocLazyLoad.load([
                //                'Scripts/Controller/patientinfo_controller.js',
                //                'Scripts/Service/login.js'
                //            ]);
                //        }]
                //    }
                //})

                .state('startsession', {
                    url: "/startsession",
                    templateUrl: "Views/startsession.html",
                    controller: 'startsession_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/startsession_controller.js'
                            ]);
                        }]
                    }
                })

                .state('aftersession', {
                    url: "/aftersession",
                    templateUrl: "Views/aftersession.html",
                    controller: 'aftersession_controller',                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'filesaver'
                            ], {
                                insertBefore: '#lazyload_placeholder'
                            })
                                .then(function () {
                                    return $ocLazyLoad.load([
                                        'Scripts/Controller/aftersession_controller.js',
                                        'Scripts/Service/audio_player.js',
                                        'Scripts/Service/oldsessions.js'
                                    ]);
                                });
                        }]
                    }
                })



                .state('sessionoutline', {
                    url: "/sessionoutline",
                    templateUrl: "Views/sessionoutline.html",
                    controller: 'sessionoutline_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/sessionoutline_controller.js',
                                'Scripts/Service/oldsessions.js'
                            ]);
                        }]
                    }
                })

                .state('amfi50settings', {
                    url: "/amfi50settings",
                    templateUrl: "Views/amfi50_settings.html",
                    controller: 'amfi50settings_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/amfi50settings_controller.js',
                                'Scripts/Service/sessionsettings.js'
                            ]);
                        }]
                    }
                })

                .state('amfi50session', {
                    url: "/amfi50session",
                    templateUrl: "Views/sessionliveamfi50.html",
                    controller: 'sessionliveamfi50_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/sessionliveamfi50_controller.js',
                                'Scripts/Service/sessionlive.js'
                            ]);
                        }]
                    }
                })

                .state('amfi100settings', {
                    url: "/amfi100settings",
                    templateUrl: "Views/amfi100_settings.html",
                    controller: 'amfi100settings_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/amfi100settings_controller.js',
                                'Scripts/Service/sessionsettings.js'
                            ]);
                        }]
                    }
                })

                .state('amfi100session', {
                    url: "/amfi100session",
                    templateUrl: "Views/sessionliveamfi100.html",
                    controller: 'sessionliveamfi100_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/sessionliveamfi100_controller.js',
                                'Scripts/Service/sessionlive.js'
                            ]);
                        }]
                    }
                })

                .state('ac_me_settings', {
                    url: "/ac_me_settings",
                    templateUrl: "Views/ac_me_settings.html",
                    controller: 'ac_me_settings_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/ac_me_settings_controller.js',
                                'Scripts/Service/sessionsettings.js'
                            ]);
                        }]
                    }
                })

                .state('acmesession', {
                    url: "/acmesession",
                    templateUrl: "Views/sessionliveacme.html",
                    controller: 'sessionliveacme_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/sessionliveacme_controller.js',
                                'Scripts/Service/sessionlive.js'
                            ]);
                        }]
                    }
                })

                .state('ac_int_settings', {
                    url: "/ac_int_settings",
                    templateUrl: "Views/ac_int_settings.html",
                    controller: 'ac_int_settings_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/ac_int_settings_controller.js',
                                'Scripts/Service/sessionsettings.js'
                            ]);
                        }]
                    }
                })

                .state('acintsession', {
                    url: "/acintsession",
                    templateUrl: "Views/sessionliveacint.html",
                    controller: 'sessionliveacint_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/sessionliveacint_controller.js',
                                'Scripts/Service/sessionlive.js'
                            ]);
                        }]
                    }
                })

                .state('job_int_settings', {
                    url: "/job_int_settings",
                    templateUrl: "Views/job_int_settings.html",
                    controller: 'job_int_settings_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/job_int_settings_controller.js',
                                'Scripts/Service/sessionsettings.js'
                            ]);
                        }]
                    }
                })

                .state('jobintsession', {
                    url: "/jobintsession",
                    templateUrl: "Views/sessionlivejobint.html",
                    controller: 'sessionlivejobint_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/sessionlivejobint_controller.js',
                                'Scripts/Service/sessionlive.js'
                            ]);
                        }]
                    }
                })

                .state('job_me_settings', {
                    url: "/job_me_settings",
                    templateUrl: "Views/job_me_settings.html",
                    controller: 'job_me_settings_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/job_me_settings_controller.js',
                                'Scripts/Service/sessionsettings.js'
                            ]);
                        }]
                    }
                })

                .state('jobmesession', {
                    url: "/jobmesession",
                    templateUrl: "Views/sessionlivejobme.html",
                    controller: 'sessionlivejobme_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/sessionlivejobme_controller.js',
                                'Scripts/Service/sessionlive.js'
                            ]);
                        }]
                    }
                })

                .state('shopping_settings', {
                    url: "/shopping_settings",
                    templateUrl: "Views/shopping_settings.html",
                    controller: 'shopping_settings_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/shopping_settings_controller.js',
                                'Scripts/Service/sessionsettings.js'
                            ]);
                        }]
                    }
                })

                .state('shoppingsession', {
                    url: "/shoppingsession",
                    templateUrl: "Views/sessionliveshopping.html",
                    controller: 'sessionliveshopping_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/sessionliveshopping_controller.js',
                                'Scripts/Service/sessionlive.js'
                            ]);
                        }]
                    }
                })

                .state('subway_settings', {
                    url: "/subway_settings",
                    templateUrl: "Views/subway_settings.html",
                    controller: 'subway_settings_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/subway_settings_controller.js',
                                'Scripts/Service/sessionsettings.js'
                            ]);
                        }]
                    }
                })

                .state('subwaysession', {
                    url: "/subwaysession",
                    templateUrl: "Views/sessionlivesubway.html",
                    controller: 'sessionlivesubway_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/sessionlivesubway_controller.js',
                                'Scripts/Service/sessionlive.js'
                            ]);
                        }]
                    }
                })

                .state('restaurant_settings', {
                    url: "/restaurant_settings",
                    templateUrl: "Views/restaurant_settings.html",
                    controller: 'restaurant_settings_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/restaurant_settings_controller.js',
                                'Scripts/Service/sessionsettings.js'
                            ]);
                        }]
                    }
                })

                .state('restaurantsession', {
                    url: "/restaurantsession",
                    templateUrl: "Views/sessionliverestaurant.html",
                    controller: 'sessionliverestaurant_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/sessionliverestaurant_controller.js',
                                'Scripts/Service/sessionlive.js'
                            ]);
                        }]
                    }
                })

                .state('resetpassword', {
                    url: "/resetpassword/:resetHash",
                    templateUrl: "Views/resetpassword.html",
                    controller: 'resetpassword_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/resetpassword_controller.js',
                                'Scripts/Service/login.js'
                            ]);
                        }]
                    }
                })

                .state('patloggedin', {
                    url: "/loggedinuser",
                    templateUrl: "Views/patloggedin.html",
                    controller: 'patloggedin_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/patloggedin_controller.js',
                                'Scripts/Service/login.js'
                            ]);
                        }]
                    }
                })

                .state('dashboard', {
                    url: "/dashboard",
                    templateUrl: "Views/dashboard.html",
                    controller: 'dashboard_controller',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'Scripts/Controller/dashboard_controller.js',
                                'Scripts/Service/login.js'
                            ]);
                        }]
                    }
                });
        }
    ])
    .run(function ($rootScope, $state) {
        $rootScope.$state = $state;
    });