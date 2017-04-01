/// <reference path="globals/angular-cookies/index.d.ts" />
/// <reference path="globals/angular-mocks/index.d.ts" />
/// <reference path="globals/angular-ui-router/index.d.ts" />
/// <reference path="globals/angular/index.d.ts" />
/// <reference path="globals/bootstrap/index.d.ts" />
/// <reference path="globals/jasmine/index.d.ts" />
/// <reference path="globals/jquery/index.d.ts" />
/// <reference path="globals/node/index.d.ts" />
/// <reference path="globals/restangular/index.d.ts" />

interface Window {
   constants: any,
   Highcharts: any
}
declare namespace angular.ui {
	interface IState{
		redirectTo?: any;
	}
}
declare namespace angular.ui {
    interface IStateService {
        previous?: IState;
    }
}
interface JQuery {
	highcharts?:any,
	cropit?:any
}