import * as angular from 'angular';

// ------------------  Libs & system --------------------
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'angular-cookies';

import './index.scss';

// ------------------  Components --------------------
import { header } from './app/components/layout/header/header';
import { footer } from './app/components/layout/footer/footer';
import { home } from './app/components/home/home';

// ------------------ General ---------------------
import routesConfig from './config/routes';

angular
  .module('app', ['ui.router'])
  .component('header', header)
  .component('footer', footer)
  .component('home', home)
  .config(routesConfig);
