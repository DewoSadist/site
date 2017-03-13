# webapp

This project is using [fountainjs](http://fountainjs.io/).

## install
````
license server http://idea.imsxm.com/
````  
### bootstrap-loader
````
npm install bootstrap-loader
````
###### Node SASS & other loaders needed to handle styles
````
npm install --save-dev jquery
npm install --save-dev css-loader node-sass resolve-url-loader sass-loader style-loader url-loader
````
Or add bootstrap-loader as a module in an entry point in your webpack config (you'll need Webpack 2.1 beta and higher):
````
entry: [ 'bootstrap-loader', './app' ]
````
add to webpack conf the following lines for bootstrap 3
for plugins
````
new webpack.ProvidePlugin({
  $: "jquery",
  jQuery: "jquery"
}),
````
for modules
```` 
// Bootstrap icon fonts
{ test: /\.(woff2?|svg)$/,
  loader: 'url-loader?limit=10000'
},
{ test: /\.(ttf|eot)$/,
  loader: 'file-loader'
},
// Serve jQuery for Bootstrap 3 scripts
{
  test: /bootstrap-sass\/assets\/javascripts\//,
  loader: 'imports?jQuery=jquery'
},
````

then install sass resourses
````
npm install sass-resources-loader
````
