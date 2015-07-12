// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

//Database instance.
var db;

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

    .run(function ($ionicPlatform, $cordovaSQLite) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }

            // Important!!
            //
            // Instantiate database file/connection after ionic platform is ready.
            //
            db = $cordovaSQLite.openDB("calchelp.db");
            $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY, descricao TEXT, valor REAL, icon TEXT, qtd INTEGER)');

        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('tab', {
            url: "/tab",
            abstract: true,
            templateUrl: "templates/tabs.html"
        })
            .state('tab.cadastro-produto', {
                url: '/cadastro-produto',
                views: {
                    'tab-pesquisa-produto': {
                        templateUrl: 'templates/tab-cadastro-produto.html',
                        controller: 'CadastroProdutoController'
                    }
                }
            })
            .state('tab.pesquisa-produto', {
                url: '/pesquisa-produto',
                views: {
                    'tab-pesquisa-produto': {
                        templateUrl: 'templates/tab-pesquisa-produto.html',
                        controller: 'PesquisaProdutoController'
                    }
                }
            })
            .state('tab.calculadora', {
                url: '/calculadora',
                views: {
                    'tab-calculadora': {
                        templateUrl: 'templates/tab-calculadora.html',
                        controller: 'CalculadoraController'
                    }
                }
            })
            .state('tab.info', {
                url: '/info',
                views: {
                    'tab-info': {
                        templateUrl: 'templates/tab-info.html',
                        controller: 'InfoController'
                    }
                }
            })

        $urlRouterProvider.otherwise('/tab/calculadora');

    });
