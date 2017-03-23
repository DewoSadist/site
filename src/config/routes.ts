export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider, $locationProvider: angular.ILocationProvider) {
  // $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('root', {
      abstract: true,
      template: '<div ui-view=""></div>',
      // resolve: {
      //   user: (UserService: IUserService, AuthService: AuthService, $q: ng.IQService, $state: ng.ui.IStateService) => {
      //     if (UserService.user) {
      //       return UserService.user
      //     } else {
      //       let deferred = $q.defer();
      //       AuthService.initiateUser()
      //         .then((response) => {
      //           deferred.resolve(response);
      //         })
      //         .catch((error) => {
      //           AuthService.logoutEventBroadcast();
      //           $state.go('users.login');
      //         });
      //       return deferred.promise;
      //     }
      //   }
      // }
    })
    .state('home', {
      url: '/',
      parent: 'root',
      // redirectTo: 'restaurants',
      component: 'home'
    })
    .state('restaurants', {
      url: '/restaurants',
      parent: 'root',
      template: '<restaurant-list></restaurant-list>',
    })
    .state('contacts', {
      url: '/contacts',
      parent: 'root',
      template: '<contacts></contacts>',
    })
    .state('about', {
      url: '/about',
      parent: 'root',
      template: '<about></about>',
    });
}
