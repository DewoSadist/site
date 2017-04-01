#!/bin/bash

#------------------------------
# Install GULP is not exists
#------------------------------

if command -v gulp > /dev/null 2>&1; then
  echo Gulp is already installed
else
  echo Installing Gulp
  npm install gulp -g
fi

#-------------------------------
# Install Webpack if not exists
#-------------------------------
if command -v webpack > /dev/null 2>&1; then
  echo Webpack is already installed
else
  echo Installing webpack
  npm install webpack -g
fi

#------------------------------
# Install SASS if not exists
#-------------------------------

if command -v sass > /dev/null 2>&1; then
  echo SASS is already installed
else
  echo Installing SASS
  gem install sass
fi

#-----------------------------------
# Install Typings if not exists
#-----------------------------------

if command -v typings > /dev/null 2>&1; then
  echo Typing is already installed
else
  echo Installing Typings
  npm install -g typings
  typings install
fi


npm install

##npm install generator-fountain-angular1 -g
