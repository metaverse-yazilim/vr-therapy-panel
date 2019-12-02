'use strict';
angular.module("vrTheraphy", [
    'ui.router',
    'ui.utils',
    'oc.lazyLoad',
    'ui.bootstrap',
    'ngIdle',
    'ngStorage',
    'ngSanitize',
    //'pascalprecht.translate',
    //'tmh.dynamicLocale'
])
    .factory('authHttpResponseInterceptor', ['$q', '$location', '$injector', function ($q, $location, $injector) {
        return {
            response: function (response) {
                if (response.status === 401) {
                    console.log("Response 401");
                }
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    console.log("Response Error 401", rejection);
                    var rootScopeService = $injector.get('$rootScope');
                    $location.path(rootScopeService.previousLocation);
                }
                else if (rejection.status === 403) {
                    console.log("Response Error 403", rejection);
                    var stateService = $injector.get('$state');
                    stateService.go('login');
                }
                return $q.reject(rejection);
            }
        }
    }])
    .filter('startFrom', function () {
        return function (data, start) {
            if (data != null) {
                return data.slice(start);
            }

        }
    })
    .constant('LOCALES', {
        'locales': {
            'tr_TR': 'Türkçe',
            'en_US': 'English'
        },
        'prefferedLocale': 'tr_TR'
    })
//    .config(['$translateProvider', function ($translateProvider) {
//        $translateProvider.useStaticFilesLoader({
//            prefix: 'Resources/locale-',// path to translations files
//            suffix: '.json'// suffix, currently- extension of the translations
//        });
//        $translateProvider.preferredLanguage('tr_TR');// is applied on first load
//        $translateProvider.useLocalStorage();// saves selected language to localStorage
//        $translateProvider.useSanitizeValueStrategy('sceParameters');
//    }])
//    .config(['$tmhDynamicLocaleProvider', function (tmhDynamicLocaleProvider) {
//        tmhDynamicLocaleProvider.localeLocationPattern('Plugins/Angular/i18n/angular-locale_{{locale}}.js');
//    }])
//.service('LocaleService', ['$translate', 'LOCALES', '$rootScope', 'tmhDynamicLocale', function ($translate, LOCALES, $rootScope, tmhDynamicLocale) {
//        'use strict';
//        // VARS
//        var localesObj = LOCALES.locales;

//        // locales and locales display names
//        var _LOCALES = Object.keys(localesObj);
//        if (!_LOCALES || _LOCALES.length === 0) {
//            console.error('There are no _LOCALES provided');
//        }
//        var _LOCALES_DISPLAY_NAMES = [];
//        _LOCALES.forEach(function (locale) {
//            _LOCALES_DISPLAY_NAMES.push(localesObj[locale]);
//        });

//        var currentLocale = $translate.proposedLanguage();// because of async loading

//        // METHODS
//        var checkLocaleIsValid = function (locale) {
//            return _LOCALES.indexOf(locale) !== -1;
//        };

//        var setLocale = function (locale) {
//            if (!checkLocaleIsValid(locale)) {
//                console.error('Locale name "' + locale + '" is invalid');
//                return;
//            }
//            startLoadingAnimation();
//            currentLocale = locale;
//            $translate.use(locale);
//        };

//        /**
//         * Stop application loading animation when translations are loaded
//         */
//        var $html = angular.element('html');
//        var LOADING_CLASS = 'app-loading';

//        function startLoadingAnimation() {
//            $html.addClass(LOADING_CLASS);
//        }

//        function stopLoadingAnimation() {
//            $html.removeClass(LOADING_CLASS);
//        }

//        // EVENTS
//        $rootScope.$on('$translateChangeSuccess', function (event, data) {
//            document.documentElement.setAttribute('lang', data.language);// sets "lang" attribute to html

//            tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-'));// load Angular locale
//        });

//        $rootScope.$on('$localeChangeSuccess', function () {
//            stopLoadingAnimation();
//        });

//        return {
//            getLocaleDisplayName: function () {
//                return localesObj[currentLocale];
//            },
//            setLocaleByDisplayName: function (localeDisplayName) {
//                setLocale(
//                    _LOCALES[
//                    _LOCALES_DISPLAY_NAMES.indexOf(localeDisplayName)// get locale index
//                    ]
//                );
//            },
//            getLocalesDisplayNames: function () {
//                return _LOCALES_DISPLAY_NAMES;
//            }
//        };
//    }])