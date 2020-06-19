const path = require('path');
var webpack = require('webpack');
module.exports = {
    
	 publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
     devServer: {
         proxy: {
             '/qpi':{
				   target: 'https://www.cyzblog.xyz/',
                //target:'http://localhost:8090/',
                 changeOrigin:true,
                 pathRewrite:{
                    '^qpi': ''
                 }
             }
         },
		  port: 8082,
		
     },
	configureWebpack: {
	    plugins: [
	      new webpack.ProvidePlugin({
	        'window.Quill': 'quill/dist/quill.js',
	        'Quill': 'quill/dist/quill.js'
	      }),
	    ]
	  }
		
		
	
	 
	 
}