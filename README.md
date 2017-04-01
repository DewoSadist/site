

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)  ![GitHub version](https://badge.fury.io/gh/boennemann%2Fbadges.svg)



# Deos Front-App

This project is using [fountainjs](http://fountainjs.io/).



## Install

Before clone you should have installed `npm`,`gulp`,`webpack`,`sass` globally.

- Run `npm install gulp -g` to install gulp globally.
- Run `npm install webpack -g` to install gulp globally.
- Run `gem install sass` to install sass (Ruby required).
- Run `npm install -g typings` to install typings via `typings install`.
- After previous step, run `typings install`.
- Run `npm install gulp-cli -g`.
- Run `npm install` after clone to download required libraries from `package.json`.

NOTE: this application currently uses Angular 1.5, which may be considered as outdated by some npm packages. For example, we downgraded `angular-animate` package to version `1.5.9`, because later versions require `angular: ^1.6.0`.



## Gulp tasks

If you have [`gulp-cli`](https://www.npmjs.com/package/gulp-cli) installed in global packages you can use equivalent:

- `gulp` or `gulp build` to build an optimized version of your application in /dist
- `gulp serve` to launch a browser sync server on your source files
- `gulp serve:dist` to launch a server on your optimized application
- `gulp ngdocs` to generate documents into /docs folder


**If you don't have [`gulp-cli`](https://www.npmjs.com/package/gulp-cli) installed in global, you should have this error:**


> /usr/local/lib/node_modules/gulp/bin/gulp.js:121
    gulpInst.start.apply(gulpInst, toRun);
TypeError: Cannot read property 'apply' of undefined



## Committing code

As we stated in a badge above, our project is commitizen-friendly. All of our commits follow the [`commitizen format`](https://gist.github.com/stephenparish/9941e89d80e2bc58a153#format-of-the-commit-message):

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Example:

```
fix(transfers): fixed rerouting bug for cash by code transfer operation

Please see files cash.ts and cash.service.ts and take a look at new private methods. Make sure you understand new rerouting algorithm.

Closes Bug number #1092
```

```
feat: implemented new authorization logic for trusted users

- new login messages and service usage according to designer's proposal.
- fixed couple of bugs mentioned by Sanzhar earlier

Thanks to Anton for suggesting form validation method
```

Note that `<scope>` is optional. Commitizen environment and packages should be all set up when you run `npm install` for the first time.

Please use [`commitizen`](http://commitizen.github.io/cz-cli/) command-line tool for generating commit messages if you feel uncomfortable manually writing all these strongly-formatted messages (we all do).
After running `git add`, run 'git cz' instead of regular commit command. You will be taken through message building steps. You will have a commitizen-style commit at the end.

For releasing new version of project, run following command `npm run release`, which will utilize [`standard-version`](https://github.com/conventional-changelog/standard-version) tool to collect ALL commitizen commits, create new version with its tag and generate CHANGELOG file.

Make sure you read  this [`article in russian`](https://anvilabs.co/blog/writing-practical-commit-messages/) for more extensive explanation



## Creating components

Before make sure to install Fountain generator globally. It scaffolds a webapp with Angular and will allow to create components

- Run `npm install yo -g`
- Run `npm install generator-fountain-angular1 -g`

There is a sub-generator available to create components.
Each generator has 2 options:
- You can set the name of the generated item with `--name`
- You can set the path of the generated item with `--dir`

**To create component use**

```
yo fountain-angular1:component --name myComponent --dir components/myComponent
```

**Then include them to `index.ts` file**

```
...
import {myComponent} from './app/myComponent';
...

angular
	...
	.component('myComponent', myComponent)
	...
```


## Build

Deos app can be built with different configurations. Configurations are stored in special `variables.json` file and placed in appropriate folder.

- Go to `src/config/env` folder and create a new folder, which matches your environment name. Example, for `myprod` configuration create file `src/config/env/myprod/variables.json`
- Copy contents from `src/config/default/variables.json` and modify as needed. **Example:**

    ```
    {
        apiUrl: 'http://api-host-name.com/', // required field 
        frontUrl: 'http://webapp-host-name.com/' // required field
    }
    
    ```

Once your configuration file is ready, try building the app (your config file will be injected):

        gulp build --env yourConfigName
   
   or serve it:
   
       gulp serve:dist --env yourConfigName
       
       
   example:
   
       gulp build --env amazon  // this will build an app with configs for deploying an app to amazon server
       


## Using constants in app:

As you figured, variables.json contains all global constant variables used throughout the application. If you want to create and use a new variable, do the following:

- create a variable as an object field in approriate `variables.json` file (just like `apiUrl` from previous example)
- inject an `appConfig` dependency in your controller/service/directive and utilize your new variable as `this.appConfig.newVariable` (for example, refer to UserService or AuthService)



## Components & Directives


### Calendar directive
Usage: `<calendar ng-model="$date"></calendar>` or `<div calendar ng-model="$date"></div>`

Where `$date` is string generated in "DD.MM.YYYY" format. 

Also accepts `yearsFrom` and `yearsTo` values. 

`<calendar ng-model="$date" years-from="1999" years-to="2000"></calendar>`.

