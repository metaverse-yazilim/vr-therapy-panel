angular.module('vrTheraphy')
    .config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: true,
            events: true,
            modules: [
                {
                    name: 'nvd3',
                    files: [
                        'Plugins/Nvd3/lib/d3.v3.js',
                        'Plugins/Nvd3/nv.d3.min.js',
                        'Plugins/Nvd3/src/utils.js',
                        'Plugins/Nvd3/src/tooltip.js',
                        'Plugins/Nvd3/src/interactiveLayer.js',
                        'Plugins/Nvd3/src/models/axis.js',
                        'Plugins/Nvd3/src/models/line.js',
                        'Plugins/Nvd3/src/models/lineWithFocusChart.js',
                        'Plugins/Angular-Nvd3/angular-nvd3.js',
                        'Plugins/Nvd3/nv.d3.min.css'
                    ],
                    serie: true // load in the exact order
                },
                {
                    name: 'rickshaw',
                    files: [
                        'Plugins/Nvd3/lib/d3.v3.js',
                        'Plugins/Rickshaw/rickshaw.min.js',
                        'Plugins/Angular-Rickshaw/rickshaw.js',
                        'Plugins/Rickshaw/rickshaw.min.css'
                    ],
                    serie: true
                },
                {
                    name: 'morris',
                    files: [
                        'Plugins/Morris/morris.css',
                        'Plugins/Morris/raphael.min.js',
                        'Plugins/Morris/morris.min.js'
                        //'Plugins/Angular-Morris/angular-morris.js',
                    ],
                    serie: true
                },
                {
                    name: 'switchery',
                    files: [
                        'Plugins/Switchery/js/switchery.min.js',
                        'Plugins/Switchery/ng-switchery.js',
                        'Plugins/Switchery/css/switchery.min.css',
                    ]
                },
                {
                    name: 'moment',
                    files: [
                        'Plugins/Moment/moment.min.js',
                        'Plugins/moment/moment-timezone.min.js'
                    ]
                },
                {
                    name: 'select',
                    files: [
                        'Plugins/Angular-Ui-Select/select2-bootstrap.css',
                        'Plugins/Angular-Ui-Select/select.min.css',
                        'Plugins/Angular-Ui-Select/select.min.js'
                    ]
                },
                {
                    name: 'select2',
                    files: [
                        'Plugins/Select2/css/select2.css',
                        'Plugins/Select2/js/select2.full.min.js'
                    ]
                },
                {
                    name: 'timeago',
                    files: [
                        'Plugins/Timeago/timeago.min.js',
                    ]
                },
                {
                    name: 'howler',
                    files: [
                        'Plugins/Howler/howler.min.js'
                    ]
                },
                {
                    name: 'device-mockup',
                    files: [
                        'Plugins/Mockup/device-mockups2.min.css'
                    ]
                },
                {
                    name: 'icheck',
                    files: [
                        'Plugins/iCheck/icheck.min.js',
                        'Plugins/iCheck/skins/square/blue.css'
                    ]
                },
                {
                    name: 'datepicker',
                    files: [
                        'Plugins/Datepicker/css/datepicker3.css',
                        'Plugins/Datepicker/js/bootstrap-datepicker.js'
                    ]
                },
                {
                    name: 'selectize',
                    files: [
                        'Plugins/Selectize/selectize.css',
                        'Plugins/Selectize/selectize.bootstrap3.css',
                        'Plugins/Selectize/selectize.js',
                        'Plugins/Selectize/ng-selectize.min.js'
                    ]
                },
                {
                    name: 'filesaver',
                    files: [
                        'Plugins/FileSaver/filesaver.min.js'
                    ]
                },
                {
                    name: 'ngtagsinput',
                    files: [
                        'Plugins/NgTags/ng-tags-input.js',
                        'Plugins/NgTags/ng-tags-input.css',
                        'Plugins/NgTags/ng-tags-input.bootstrap.css'
                    ]
                },
                {
                    name: 'inputMask',
                    files: [
                        'Plugins/Jquery-Inputmask/jquery.inputmask.min.js'
                    ]
                },
                {
                    name: 'autonumeric',
                    files: [
                        'Plugins/Jquery-Autonumeric/autoNumeric.js'
                    ]
                },
                {
                    name: 'summernote',
                    files: [
                        'Plugins/Summernote/summernote.js',
                        'Plugins/Summernote/angular-summernote.js',
                        'Plugins/Summernote/summernote.css'
                    ]
                },
                {
                    name: 'timepicker',
                    files: [
                        'Plugins/Bootstrap-Timepicker/bootstrap-timepicker.min.css',
                        'Plugins/Bootstrap-Timepicker/bootstrap-timepicker.min.js'
                    ]
                },
                {
                    name: 'vcRecaptcha',
                    files: [
                        'Plugins/Recaptcha/angular-recaptcha.js'
                    ]
                }
            ]
        });
    }]);